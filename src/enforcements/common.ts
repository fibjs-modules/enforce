import Validator, { ValidationCallback } from '../validator';
import Ranges = require('./ranges');

export interface IValidator {
    /**
     * @bad_design
     */
    validate: ValidationCallback

    ifDefined(): IValidator
    ifNotEmptyString(): IValidator
    ifType(type: string): IValidator
    ifNotType(type: string): IValidator
}

export function required(message: string = 'required'): IValidator {
    return new Validator((value, next) => {
        if (value === null || value === undefined) return next(message);
        return next();
    });
}

export function notEmptyString(message: string = 'empty-string'): IValidator {
    return Ranges.length(1, undefined, message);
}

export function sameAs(property: string, message: string = 'not-same-as'): IValidator {
    return new Validator((value, next) => {
        if (value !== this[property]) return next(message);
        return next();
    });
}
