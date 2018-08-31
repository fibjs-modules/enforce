/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
/// <reference path="ranges.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = require("../validator");
const Ranges = require("./ranges");
function required(message = 'required') {
    return new Validator((value, next) => {
        if (value === null || value === undefined)
            return next(message);
        return next();
    });
}
exports.required = required;
function notEmptyString(message = 'empty-string') {
    return Ranges.length(1, undefined, message);
}
exports.notEmptyString = notEmptyString;
function sameAs(property, message = 'not-same-as') {
    return new Validator((value, next) => {
        if (value !== this[property])
            return next(message);
        return next();
    });
}
exports.sameAs = sameAs;
