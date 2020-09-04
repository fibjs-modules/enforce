import Validator from '../validator';
import { IValidator } from './common';

export function inside(list: string[], message?: string): IValidator;
export function inside(list: number[], message?: string): IValidator;
export function inside(list: any[], message: string = 'outside-list'): IValidator {
    return new Validator((value, next) => {
        if (list.indexOf(value) >= 0) return next();
        return next(message);
    });
}

export function outside(list: string[], message?: string): IValidator;
export function outside(list: number[], message?: string): IValidator;
export function outside(list: any[], message: string = 'inside-list'): IValidator {
    return new Validator((value, next) => {
        if (list.indexOf(value) === -1) return next();
        return next(message);
    });
}