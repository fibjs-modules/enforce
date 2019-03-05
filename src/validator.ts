/// <reference path="../@types/index.d.ts" />

class Validator implements FibjsEnforce.IValidator {
    private validator: FibjsEnforce.ValidationCallback;

    constructor(validate: FibjsEnforce.ValidationCallback) {
        this.validator = validate;
        return this;
    }
    
    public validate(data: any, next: (message?: string) => void, thisArg?: any, contexts?: FibjsEnforce.ContextMap) {
        contexts = contexts || {};
        this.validator.apply(thisArg, [data, next, contexts]);
    }

    ifDefined(): FibjsEnforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            return this.validator(value, next, contexts);
        });
    }
    
    ifNotEmptyString(): FibjsEnforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            if (typeof value !== 'string') return next();
            if (value.length === 0) return next();
            return this.validator(value, next, contexts);
        });
    }

    ifType(type: string): FibjsEnforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (typeof value != type) return next();
            return this.validator(value, next, contexts);
        });
    }

    ifNotType(type: string): FibjsEnforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (typeof value != type) return this.validator(value, next, contexts);
            return next();
        });
    }
}

export = Validator;