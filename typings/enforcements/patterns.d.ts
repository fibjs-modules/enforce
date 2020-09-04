import Validator from '../validator';
/**
 * Check if a value matches a given pattern.
 * You can define a pattern string and regex
 * modifiers or just send the RegExp object
 * as 1st argument.
 **/
export declare function match(pattern: RegExp, message?: string): Validator;
export declare function match(pattern: string, modifiers?: string, message?: string): Validator;
/**
 * Check if a value is an hexadecimal string
 * (letters from A to F and numbers).
 **/
export declare function hexString(message?: string): Validator<{}>;
/**
 * Check if a value is an e-mail address
 * (simple checking, works 99%).
 **/
export declare function email(message?: string): Validator<{}>;
/**
 * Check if it's a valid IPv4 address.
 **/
export declare function ipv4(message?: string): Validator<{}>;
/**
 * Check if it's a valid IPv6 address.
 **/
export declare function ipv6(message?: string): Validator<{}>;
/**
 * Check if it's a valid MAC address.
 **/
export declare function mac(message?: string): Validator<{}>;
/**
 * Check if it's a valid UUID version 3 (MD5 hash).
 * http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_3_.28MD5_hash.29
 **/
export declare function uuid3(message?: string): Validator<{}>;
/**
 * Check if it's a valid UUID version 4 (random).
 * http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
 **/
export declare function uuid4(message?: string): Validator<{}>;
