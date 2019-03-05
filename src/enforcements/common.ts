/// <reference path="../../@types/index.d.ts" />

import Validator = require('../validator');
import Ranges = require('./ranges');

export function required(message: string = 'required'): FibjsEnforce.IValidator {
    return new Validator((value, next) => {
        if (value === null || value === undefined) return next(message);
        return next();
    });
}

export function notEmptyString(message: string = 'empty-string'): FibjsEnforce.IValidator {
    return Ranges.length(1, undefined, message);
}

export function sameAs(property: string, message: string = 'not-same-as'): FibjsEnforce.IValidator {
    return new Validator((value, next) => {
        if (value !== this[property]) return next(message);
        return next();
    });
}
