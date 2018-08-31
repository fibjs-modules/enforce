var assert = require("assert");

exports.checkValidation = function (done, validation_err) {
    return function (err) {
        assert.equal(err, validation_err);
        return done();
    };
};
