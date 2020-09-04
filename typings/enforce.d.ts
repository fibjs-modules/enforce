/// <reference lib="es2017" />
import Validator, { IValidateCtxUserData, IValidationProc } from './validator';
export interface ValidationError<TP extends string = string> extends Error {
    type: 'validation';
    msg?: string;
    _property?: TP;
    _value?: any;
}
export default class Enforce<TPROP extends string = string, TENCTX extends IValidateCtxUserData = {}> {
    private options?;
    private validations;
    private contexts;
    constructor(options?: {
        returnAllErrors: boolean;
    });
    add(property: TPROP, _validator: IValidationProc<TENCTX> | Validator<TENCTX>): this;
    context(): TENCTX;
    context(name: keyof TENCTX): TENCTX[keyof TENCTX];
    context(name: keyof TENCTX, value: any): this;
    clear(): void;
    checkSync<TD extends Record<string, any> = {}>(data: TD): ValidationError[];
    check(data: any, cb: (errors: null | ValidationError | ValidationError[]) => void): void;
}
