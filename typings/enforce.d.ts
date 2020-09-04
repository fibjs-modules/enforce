/// <reference lib="es2017" />
import Validator, { IValidateCtxUserData, IValidationProc } from './validator';
export interface ValidationError extends Error {
    property?: string;
    value?: any;
    msg?: string;
    type?: string;
}
export default class Enforce<TENCTX extends IValidateCtxUserData = {}> {
    private options?;
    private validations;
    private contexts;
    constructor(options?: {
        returnAllErrors: boolean;
    });
    add(property: string, _validator: IValidationProc<TENCTX> | Validator<TENCTX>): this;
    context(): TENCTX;
    context(name: keyof TENCTX): TENCTX[keyof TENCTX];
    context(name: keyof TENCTX, value: any): this;
    clear(): void;
    checkSync(data: any): ValidationError[];
    check(data: any, cb: (errors: null | ValidationError | ValidationError[]) => void): void;
}
