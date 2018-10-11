declare var exports: any

declare namespace enforce {
    interface enforcementValidation {
        (...args: any[]): enforce.IValidator
    }

    interface enforcementsContainer {
        [key: string]: enforcementValidation
    }

    export interface IEnforce {
        add(property: string, validator: ValidationCallback): IEnforce;
        add(property: string, validator: IValidator): IEnforce;
        context(): any;
        context(name: string): any;
        context(name: string, value: any): IEnforce;
        clear();
        check(data: any, cb: (error: Error) => void);
        check(data: any, cb: (errors: Error[]) => void);
    }

    export interface Options {
        returnAllErrors: boolean;
    }

    export interface ContextMap {
        property?: string;
        [name: string]: any;
    }

    export interface IValidator {
        validate(data: any, next: (message?: string) => void, thisArg?: any, contexts?: ContextMap)
    }

    export interface ValidationCallback {
        (value: any, next: (errorMessage?: string) => boolean, contexts: ContextMap);
    }

    export interface ValidatorMap {
        [property: string]: IValidator[];
    }

    export interface ValidationError extends Error {
        property?: string;
        value?: any;
        msg?: string;
        type?: string;
    }

    export const Enforce: { new (options?: Options): IEnforce; }
    export const Validator: { new (options?: Options): IValidator; }

    export const lists: enforcementsContainer;
    export const ranges: enforcementsContainer;
    export const security: enforcementsContainer;
    export const patterns: enforcementsContainer;

    /* common :start */
    export const required: enforcementValidation;
    export const notEmptyString: enforcementValidation;
    export const sameAs: enforcementValidation;
    /* common :end */
}