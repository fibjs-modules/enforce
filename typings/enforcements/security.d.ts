import { IValidator } from './common';
export interface SecurityUsernameOptions {
    length: number;
    expr?: RegExp;
}
export declare function username(message?: string): IValidator;
export declare function username(options: SecurityUsernameOptions, message?: string): IValidator;
export declare function password(message?: string): IValidator;
export declare function password(checks: string, message?: string): IValidator;
export declare function creditcard(types?: string[], message?: string): IValidator;
