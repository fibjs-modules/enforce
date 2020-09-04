import { IValidator } from "./enforcements/common";

export interface IValidateContext {
    property?: string;
    [name: string]: any;
}

export interface ValidationCallback {
    (value: any, next: (errorMessage?: string) => any, thisArg?: any, contexts?: IValidateContext): void;
}

export default class Validator implements IValidator {
    private validator: ValidationCallback;

    constructor(validate: ValidationCallback) {
        this.validator = validate;
        return this;
    }
    
    public validate(data: any, next: (message?: string) => void, thisArg?: any, contexts?: IValidateContext) {
        contexts = contexts || {};
        this.validator.apply(thisArg, [data, next, contexts]);
    }

    ifDefined(): IValidator {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            return this.validator(value, next, contexts);
        });
    }
    
    ifNotEmptyString(): IValidator {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            if (typeof value !== 'string') return next();
            if (value.length === 0) return next();
            return this.validator(value, next, contexts);
        });
    }

    ifType(type: string): IValidator {
        return new Validator((value, next, contexts) => {
            if (typeof value != type) return next();
            return this.validator(value, next, contexts);
        });
    }

    ifNotType(type: string): IValidator {
        return new Validator((value, next, contexts) => {
            if (typeof value != type) return this.validator(value, next, contexts);
            return next();
        });
    }
}