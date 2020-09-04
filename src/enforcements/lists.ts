import Validator from '../validator';

export function inside(list: string[], message?: string): Validator;
export function inside(list: number[], message?: string): Validator;
export function inside(list: any[], message: string = 'outside-list'): Validator {
    return new Validator((value, next) => {
        if (list.indexOf(value) >= 0) return next();
        return next(message);
    });
}

export function outside(list: string[], message?: string): Validator;
export function outside(list: number[], message?: string): Validator;
export function outside(list: any[], message: string = 'inside-list'): Validator {
    return new Validator((value, next) => {
        if (list.indexOf(value) === -1) return next();
        return next(message);
    });
}