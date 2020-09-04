import Validator from '../validator';
import Ranges = require('./ranges');

export function required(message: string = 'required') {
    return new Validator((value, next) => {
        if (value === null || value === undefined) return next(message);
        return next();
    });
}

export function notEmptyString(message: string = 'empty-string') {
    return Ranges.length(1, undefined, message);
}

export function sameAs(property: string, message: string = 'not-same-as') {
    return new Validator((value, next) => {
        if (value !== this[property]) return next(message);
        return next();
    });
}
