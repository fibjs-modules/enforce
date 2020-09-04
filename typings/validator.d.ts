export declare type IValidateCtxUserData = Record<string | symbol | number, any>;
declare type IValidateContext<TCTX extends IValidateCtxUserData = {}> = {
    property: string;
    data: any;
    u: TCTX;
};
export interface IValidationProc<TCTX extends IValidateCtxUserData = {}> {
    (value: any, next: (errorMessage?: string) => any, contexts: IValidateContext<TCTX>): void;
}
export default class Validator<TCTX extends IValidateCtxUserData = {}> {
    private validator;
    private _thisArg;
    constructor(validate: IValidationProc<TCTX>);
    validate(data: any, next: (message?: string) => void, contexts?: TCTX): void;
    _setThisArg(thisArg: any): void;
    /**
     * @description enforce validating if data field defined.
     */
    ifDefined(): Validator<TCTX>;
    /**
     * @description enforce validating if data field not empty string.
     */
    ifNotEmptyString(): Validator<TCTX>;
    /**
     * @description enforce validating if data field's type equals to `type`
     */
    ifType(type: string): Validator<TCTX>;
    ifNotType(type: string): Validator<TCTX>;
}
export {};
