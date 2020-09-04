import Validator from '../validator';
export interface SecurityUsernameOptions {
    length: number;
    expr?: RegExp;
}
export declare function username(message?: string): Validator;
export declare function username(options: SecurityUsernameOptions, message?: string): Validator;
export declare function password(message?: string): Validator;
export declare function password(checks: string, message?: string): Validator;
export declare function creditcard(types?: string[], message?: string): Validator<{}>;
