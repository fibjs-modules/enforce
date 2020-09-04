import { ValidationCallback } from '../validator';
export interface IValidator {
    /**
     * @bad_design
     */
    validate: ValidationCallback;
    ifDefined(): IValidator;
    ifNotEmptyString(): IValidator;
    ifType(type: string): IValidator;
    ifNotType(type: string): IValidator;
}
export declare function required(message?: string): IValidator;
export declare function notEmptyString(message?: string): IValidator;
export declare function sameAs(property: string, message?: string): IValidator;
