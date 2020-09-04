export interface IValidateContext {
    property?: string;
    [name: string]: any;
}
export interface ValidationCallback {
    (value: any, next: (errorMessage?: string) => any, thisArg?: any, contexts?: IValidateContext): void;
}
