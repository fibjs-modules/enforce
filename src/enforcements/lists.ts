/// <reference path="../../@types/index.d.ts" />

import Validator = require('../validator');

export function inside(list: string[], message?: string): FibjsEnforce.IValidator;
export function inside(list: number[], message?: string): FibjsEnforce.IValidator;
export function inside(list: any[], message: string = 'outside-list'): FibjsEnforce.IValidator {
    return new Validator((value, next) => {
        if (list.indexOf(value) >= 0) return next();
        return next(message);
    });
}

export function outside(list: string[], message?: string): FibjsEnforce.IValidator;
export function outside(list: number[], message?: string): FibjsEnforce.IValidator;
export function outside(list: any[], message: string = 'inside-list'): FibjsEnforce.IValidator {
    return new Validator((value, next) => {
        if (list.indexOf(value) === -1) return next();
        return next(message);
    });
}