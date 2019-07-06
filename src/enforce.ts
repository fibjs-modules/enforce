/// <reference path="../@types/index.d.ts" />

import Validator = require('./validator');

class Enforce implements FibjsEnforce.IEnforce {
    private validations: FibjsEnforce.ValidatorDict = {};
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
            throw new Error('Missing validator (function) in FibjsEnforce.add(property, validator)');
        }

        if (!this.validations.hasOwnProperty(property))
            this.validations[property] = [];

        this.validations[property].push(validator);
        return this;
    }

    context(): FibjsEnforce.ContextMap;
    context(name: string): any;
    context(name: string, value: any): Enforce;
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

    check(data: any, cb: (errors: any) => void): any {
        var validations: {
            property: string;
            validator: FibjsEnforce.IValidator;
        }[] = [];

        var errors: Error[] = [];
        var next = () => {
            if (validations.length === 0) {
                if (errors.length > 0) return cb(errors);
                else return cb(null);
            }

            var validation = validations.shift();
            this.contexts.property = validation.property;

            validation.validator.validate(
                data[validation.property],
                (message?: string) => {
                    if (message) {
                        var err: FibjsEnforce.ValidationError = new Error(message);
                        err.property = validation.property;
                        err.value = data[validation.property];
                        err.msg = message;
                        err.type = "validation";

                        if (!this.options.returnAllErrors) return cb(err);
                        errors.push(err);
                    }

                    return next();
                },
                data,
                this.contexts
            );
        };

        for (var k in this.validations) {
            for (var i = 0; i < this.validations[k].length; i++) {
                validations.push({
                    property: k,
                    validator: this.validations[k][i]
                });
            }
        }

        return next();
    }
}


export = Enforce;