/// <reference lib="es2017" />
/// <reference path="../@types/index.d.ts" />

import coroutine = require('coroutine');
import Validator = require('./validator');

class Enforce implements FibjsEnforce.IEnforce {
    private validations: FibjsEnforce.ValidatorListDict = {};
    private contexts: FibjsEnforce.ContextMap = {};

    constructor(private options?: FibjsEnforce.Options) {
        this.options = {
            returnAllErrors: options && !!options.returnAllErrors
        }
    }

    add(property: string, validator: any) {
        if (typeof validator === 'function' && validator.length >= 2) {
            validator = new Validator(validator);
        }

        if (validator.validate === undefined) {
            throw new Error('[FibjsEnforce.add(property, validator)]Missing validate function validator');
        }

        if (!this.validations.hasOwnProperty(property) || !Array.isArray(this.validations[property]))
            this.validations[property] = [];

        this.validations[property].push(validator);
        return this;
    }

    context(name?: string, value?: any) {
        if (name && value) {
            this.contexts[name] = value;
            return this;
        }
        else if (name)
            return this.contexts[name];
        else
            return this.contexts;
    }

    clear() {
        this.validations = {};
    }

    checkSync (data: any): Error[] {
        const validation_entries = Object.entries(this.validations);

        const errors: Error[] = [];

        const { returnAllErrors } = this.options;
        const evts = [];

        /**
         * @description noErrorsOrNeedAllErrors means check process could end
         */
        const noErrorsOrNeedAllErrors = () => !errors.length || returnAllErrors

        while (validation_entries.length && noErrorsOrNeedAllErrors()) {
            const [property, validationList] = validation_entries.shift();
            const _validationList = Array.from(validationList);
            
            const contexts = {...this.contexts};
            contexts.property = property;

            while (_validationList.length && noErrorsOrNeedAllErrors()) {
                const _evt = new coroutine.Event();
                evts.push(_evt);

                const validator = _validationList.shift();

                validator.validate(
                    data[property],
                    (message?: string) => {
                        if (message) {
                            const err: FibjsEnforce.ValidationError = new Error(message);
                            err.property = property;
                            err.value = data[property];
                            err.msg = message;
                            err.type = "validation";

                            errors.push(err);
                        }

                        _evt.set();
                    },
                    data,
                    contexts
                );

                coroutine.start(() => {
                    while (true) {
                        if (noErrorsOrNeedAllErrors())
                            return ;

                        _evt.set()
                        break
                    }
                });
            }
        }

        evts.forEach(ev => ev.wait());

        return errors;
    }

    check(data: any, cb: (errors: any) => void): any {
        const errors = this.checkSync(data);
        const { returnAllErrors } = this.options;

        if (errors.length) {
            cb(!returnAllErrors ? errors[0] : errors)
        } else {
            cb(null);
        }
    }
}


export = Enforce;