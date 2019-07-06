/// <reference path="../@types/index.d.ts" />

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
        const errors = <Error[]>[];

        if (!Object.keys(this.validations))
            return errors;
            
        const contexts = {...this.contexts}
        const { returnAllErrors } = this.options;

        let _err: FibjsEnforce.ValidationError = null;
        for (let property in this.validations) {
            const validators = this.validations[property]

            for (let i = 0; i < validators.length; i++) {
                const validator = validators[i];

                validator.validate(
                    data[property],
                    (message?: string) => {
                        if (!message)
                            return ;

                        _err = new Error(message);
                        _err.property = property;
                        _err.value = data[property];
                        _err.msg = message;
                        _err.type = "validation";
                    },
                    data,
                    contexts
                );

                if (!_err)
                    continue ;
                
                errors.push(_err);
                _err = null;
                if (!returnAllErrors) break;
            }

            if (errors.length && !returnAllErrors)
                break;
        }

        return errors;
    }

    check(data: any, cb: (errors: Error[] | Error) => void): void {
        const errs = this.checkSync(data)
        if (!errs.length)
            cb(null)
        else {
            cb(this.options.returnAllErrors ? errs : errs[0])
        }
    }
}


export = Enforce;