/// <reference path="enforce.d.ts" />
class Validator {
    constructor(validate) {
        this.validator = validate;
        return this;
    }
    validate(data, next, thisArg, contexts = {}) {
        this.validator.apply(thisArg, [data, next, contexts]);
    }
    ifDefined() {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null)
                return next();
            return this.validator(value, next, contexts);
        });
    }
    ifNotEmptyString() {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null)
                return next();
            if (typeof value !== 'string')
                return next();
            if (value.length === 0)
                return next();
            return this.validator(value, next, contexts);
        });
    }
    ifType(type) {
        return new Validator((value, next, contexts) => {
            if (typeof value != type)
                return next();
            return this.validator(value, next, contexts);
        });
    }
    ifNotType(type) {
        return new Validator((value, next, contexts) => {
            if (typeof value != type)
                return this.validator(value, next, contexts);
            return next();
        });
    }
}
module.exports = Validator;
