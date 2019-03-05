declare namespace FibjsEnforce {
    interface enforcementValidation {
        (...args: any[]): FibjsEnforce.IValidator
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
        clear(): void;
        check(data: any, cb: (error: Error | Error[]) => void): any;
    }

    export interface Options {
        returnAllErrors: boolean;
    }

    export interface ContextMap {
        property?: string;
        [name: string]: any;
    }

    export interface IValidator {
        validate: ValidationCallback

        ifDefined(): FibjsEnforce.IValidator
        ifNotEmptyString(): FibjsEnforce.IValidator
        ifType(type: string): FibjsEnforce.IValidator
        ifNotType(type: string): FibjsEnforce.IValidator
    }

    export interface ValidationCallback {
        (value: any, next: (errorMessage?: string) => boolean, thisArg?: any, contexts?: ContextMap): void;
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

    interface ExportModule {
        Enforce: { new (options?: Options): IEnforce; }
        Validator: { new (callback: ValidationCallback): IValidator; }

        lists: enforcementsContainer;
        ranges: enforcementsContainer;
        security: enforcementsContainer;
        patterns: enforcementsContainer;

        /* common :start */
        required: enforcementValidation;
        notEmptyString: enforcementValidation;
        sameAs: enforcementValidation;
        /* common :end */
    }
}

declare module "@fibjs/enforce" {
    const mod: FibjsEnforce.ExportModule
    export = mod
}
