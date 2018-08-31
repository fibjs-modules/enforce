/// <reference path="enforce.d.ts" />
/// <reference path="validator.ts" />
const Validator = require("./validator");
class Enforce {
    constructor(options) {
        this.validations = {};
        this.contexts = {};
        this.options = {
            returnAllErrors: options && !!options.returnAllErrors
        };
        return this;
    }
    add(property, validator) {
        if (typeof validator === 'function' && validator.length >= 2) {
            validator = new Validator(validator);
        }
        if (validator.validate === undefined) {
            throw new Error('Missing validator (function) in Enforce.add(property, validator)');
        }
        if (!this.validations.hasOwnProperty(property))
            this.validations[property] = [];
        this.validations[property].push(validator);
        return this;
    }
    context(name, value) {
        if (name && value) {
            this.contexts[name] = value;
            return this;
        }
        else if (name)
            return this.contexts[name];
        else
            return this.contexts;
    }
    clear() {
        this.validations = {};
    }
    check(data, cb) {
        var validations = [];
        var errors = [];
        var next = () => {
            if (validations.length === 0) {
                if (errors.length > 0)
                    return cb(errors);
                else
                    return cb(null);
            }
            var validation = validations.shift();
            this.contexts.property = validation.property;
            validation.validator.validate(data[validation.property], function (message) {
                if (message) {
                    var err = new Error(message);
                    err.property = validation.property;
                    err.value = data[validation.property];
                    err.msg = message;
                    err.type = "validation";
                    if (!this.options.returnAllErrors)
                        return cb(err);
                    errors.push(err);
                }
                return next();
            }.bind(this), data, this.contexts);
        };
        for (var k in this.validations) {
            for (var i = 0; i < this.validations[k].length; i++) {
                validations.push({
                    property: k,
                    validator: this.validations[k][i]
                });
            }
        }
        return next();
    }
}
module.exports = Enforce;
