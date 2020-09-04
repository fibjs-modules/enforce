import { IValidator } from "./enforcements/common";
export interface IValidateContext {
    property?: string;
    [name: string]: any;
}
export interface ValidationCallback {
    (value: any, next: (errorMessage?: string) => any, thisArg?: any, contexts?: IValidateContext): void;
}
export default class Validator implements IValidator {
    private validator;
    constructor(validate: ValidationCallback);
    validate(data: any, next: (message?: string) => void, thisArg?: any, contexts?: IValidateContext): void;
    ifDefined(): IValidator;
    ifNotEmptyString(): IValidator;
    ifType(type: string): IValidator;
    ifNotType(type: string): IValidator;
}
