/// <reference lib="es2017" />
export interface ValidationError extends Error {
    property?: string;
    value?: any;
    msg?: string;
    type?: string;
}
export default class Enforce {
    private options?;
    private validations;
    private contexts;
    constructor(options?: {
        returnAllErrors: boolean;
    });
    add(property: string, validator: any): this;
    context(name?: string, value?: any): any;
    clear(): void;
    checkSync(data: any): Error[];
    check(data: any, cb: (errors: any) => void): any;
}
