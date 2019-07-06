declare namespace FibjsEnforce {
    interface enforcementValidation {
        (...args: any[]): FibjsEnforce.IValidator
    }

    interface enforcementsContainer {
        [key: string]: enforcementValidation
    }

    interface IEnforce {
        add(property: string, validator: ValidationCallback): this;
        add(property: string, validator: IValidator): this;
        context(): any;
        context(name: string): any;
        context(name: string, value: any): this;
        clear(): void;
        check(data: any, cb: (error: Error | Error[]) => void): void;
        checkSync(data: any): Error[]
    }

    interface Options {
        returnAllErrors: boolean;
    }

    interface ContextMap {
        property?: string;
        [name: string]: any;
    }

    interface IValidator {
        /**
         * @bad_design
         */
        validate: ValidationCallback

        ifDefined(): FibjsEnforce.IValidator
        ifNotEmptyString(): FibjsEnforce.IValidator
        ifType(type: string): FibjsEnforce.IValidator
        ifNotType(type: string): FibjsEnforce.IValidator
    }

    interface ValidationCallback {
        (value: any, next: (errorMessage?: string) => any, thisArg?: any, contexts?: ContextMap): void;
    }

    interface ValidatorListDict {
        [property: string]: IValidator[];
    }

    interface ValidationError extends Error {
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
