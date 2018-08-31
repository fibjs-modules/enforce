/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = require("../validator");
function inside(list, message = 'outside-list') {
    return new Validator((value, next) => {
        if (list.indexOf(value) >= 0)
            return next();
        return next(message);
    });
}
exports.inside = inside;
function outside(list, message = 'inside-list') {
    return new Validator((value, next) => {
        if (list.indexOf(value) === -1)
            return next();
        return next(message);
    });
}
exports.outside = outside;
