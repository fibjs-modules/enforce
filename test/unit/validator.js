
var enforce = require("../..");

describe("enforce.required()", function () {
	var validator = enforce.required();

	it("should pass 1", function () {
		assert.equal(validator.validateSync(1), undefined);
	});

	it("should pass 0", function () {
		assert.equal(validator.validateSync(0), undefined);
	});

	it("should pass ''", function () {
		assert.equal(validator.validateSync(''), undefined);
	});

	it("should pass false", function () {
		assert.equal(validator.validateSync(false), undefined);
	});

	it("should not pass null", function () {
		assert.equal(validator.validateSync(null), 'required');
	});

	it("should not pass undefined", function () {
		assert.equal(validator.validateSync(undefined), 'required');
	});

	it("should pass null with .ifDefined()", function () {
		assert.equal(
            validator.ifDefined().validateSync(null), undefined
        );
	});

	it("should pass undefined with .ifDefined()", function () {
        assert.equal(
            validator.ifDefined().validateSync(undefined), undefined
        );
	});

	describe("with custom error", function () {
		var validator = enforce.required('custom-error');

		it("should not pass null with 'custom-error'", function () {
            assert.equal(
                validator.validateSync(null), 'custom-error'
            );
		});
	});
});

describe("enforce.notEmptyString()", function () {
	var validator = enforce.notEmptyString();

	it("should pass 'hello'", function () {
		assert.equal(validator.validateSync('hello'), undefined);
	});

	it("should pass ' '", function () {
		assert.equal(validator.validateSync('  '), undefined);
	});

	it("should not pass ''", function () {
		assert.equal(validator.validateSync(''), 'empty-string');
	});

	it("should not pass null", function () {
		assert.equal(validator.validateSync(null), 'undefined');
	});

	it("should not pass undefined", function () {
		assert.equal(validator.validateSync(undefined), 'undefined');
	});

	it("should pass null with .ifDefined()", function () {
        assert.equal(
            validator.ifDefined().validateSync(null), undefined
        );
	});

	it("should pass undefined with .ifDefined()", function () {
        assert.equal(
            validator.ifDefined().validateSync(undefined), undefined
        );
	});

	describe("with custom error", function () {
		var validator = enforce.notEmptyString('custom-error');

		it("should not pass '' with 'custom-error'", function () {
    		assert.equal(validator.validateSync(''), 'custom-error');
		});
	});
});

describe("enforce.sameAs()", function () {
	var validator = enforce.sameAs('other');

	it("should pass 'hello' === 'hello'", function () {
        assert.equal(validator.validateSync('hello', { other: 'hello' }), 'not-same-as');
	});

	it("should pass '' === ''", function () {
        assert.equal(validator.validateSync('', { other: '' }), 'not-same-as');
	});

	it("should not pass '' === 0", function () {
        assert.equal(validator.validateSync('', { other: 0 }), 'not-same-as');
	});

	it("should not pass '' === undefined", function () {
        assert.equal(validator.validateSync('', { other: undefined }), 'not-same-as');
	});

	describe("with custom error", function () {
		var validator = enforce.sameAs('other', 'custom-error');

		it("should not pass 'hello' === '' with 'custom-error'", function () {
            assert.equal(validator.validateSync('hello', { other: '' }), 'custom-error');
		});
	});
});
