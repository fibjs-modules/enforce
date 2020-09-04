/// <reference lib="es2017" />

import coroutine = require('coroutine');
import Validator, { IValidateCtxUserData, IValidationProc } from './validator';

export interface ValidationError extends Error {
    property?: string;
    value?: any;
    msg?: string;
    type?: string;
}

function canBeyKey (key: any): key is (symbol | bigint | number | string) {
    switch (typeof key) {
        case 'symbol':
        case 'number':
        case 'string':
        case 'bigint':
            return true;
        default:
            break;
    }

    return false;
}

export default class Enforce<TENCTX extends IValidateCtxUserData = {}> {
    private validations: {
        [property: string]: Validator[];
    } = {};
    
    private contexts: TENCTX = {} as TENCTX;

    constructor(private options?: {
        returnAllErrors: boolean;
    }) {
        this.options = {
            returnAllErrors: options && !!options.returnAllErrors
        }
    }

    add(property: string, _validator: IValidationProc<TENCTX> | Validator<TENCTX>) {
        let validator: Validator<TENCTX>;
        
        // if validator is one IValidationProc<TENCTX>
        if (typeof _validator === 'function' && _validator.length >= 2) {
            validator = new Validator<TENCTX>(_validator);
        } else
            validator = _validator as Validator<TENCTX>;

        if (validator.validate === undefined)
            throw new Error('[Enforce.add(property, validator)] Missing validate function validator');

        if (!this.validations.hasOwnProperty(property) || !Array.isArray(this.validations[property]))
            this.validations[property] = [];

        this.validations[property].push(validator);

        return this;
    }

    context(): TENCTX;
    context(name: keyof TENCTX): TENCTX[keyof TENCTX];
    context(name: keyof TENCTX, value: any): this;
    context(name?: keyof TENCTX, value?: any) {
        if (canBeyKey(name) && value !== undefined) {
            this.contexts[name] = value;
            return this;
        } else if (canBeyKey(name))
            return this.contexts[name];
        else
            return this.contexts;
    }

    clear() {
        this.validations = {};
    }

    checkSync (data: any): ValidationError[] {
        const validation_entries = Object.entries(this.validations);

        const errors: ValidationError[] = [];

        const { returnAllErrors } = this.options;
        const evts = [];

        /**
         * @description noErrorsOrNeedAllErrors means check process could end
         */
        const noErrorsOrNeedAllErrors = () => !errors.length || returnAllErrors

        while (validation_entries.length && noErrorsOrNeedAllErrors()) {
            const [property, validationList] = validation_entries.shift();
            const _validationList = Array.from(validationList);
            
            const contexts = {
                property,
                u: { ...this.contexts },
            };

            while (_validationList.length && noErrorsOrNeedAllErrors()) {
                const _evt = new coroutine.Event();
                evts.push(_evt);

                const validator = _validationList.shift();

                validator.setThisArg(data);
                validator.validate(
                    data[property],
                    (message?: string) => {
                        if (message) {
                            const err: ValidationError = new Error(message);
                            err.property = property;
                            err.value = data[property];
                            err.msg = message;
                            err.type = "validation";

                            errors.push(err);
                        }

                        _evt.set();
                    },
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

    check(data: any, cb: (errors: null | ValidationError | ValidationError[]) => void): void {
        const errors = this.checkSync(data);
        const { returnAllErrors } = this.options;

        if (errors.length)
            cb(!returnAllErrors ? errors[0] : errors)
        else
            cb(null);
    }
}