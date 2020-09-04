import Validator from '../validator';
export declare function required(message?: string): Validator<{}>;
export declare function notEmptyString(message?: string): Validator<{}>;
export declare function sameAs(property: string, message?: string): Validator<{}>;
