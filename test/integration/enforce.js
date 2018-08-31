
var common  = require("../common");
var enforce = require("../..");

describe("enforce.Enforce", function () {
	it("should be a function", function (done) {
		assert.isFunction(enforce.Enforce);

		return done();
	});
	it("should create an object with .add() and .check()", function (done) {
		var checks = new enforce.Enforce();

		assert.isFunction(checks.add);
		assert.isFunction(checks.check);

		return done();
	});
	it("should accept options as first argument", function (done) {
		var checks = new enforce.Enforce({
			returnAllErrors : false
		});

		assert.equal(checks.options.returnAllErrors, false);

		checks = new enforce.Enforce({
			returnAllErrors : true
		});

		assert.equal(checks.options.returnAllErrors, true);

		return done();
	});
});

describe("new enforce.Enforce()", function () {
	describe(".add", function () {
	    var checks = new enforce.Enforce();

	    it("should have the .add() method", function (done) {
	        assert.isFunction(checks.add);
	        done();
	    });

		it("should throw if not passing a validator", function (done) {
			assert.throws(function () {
				checks.add("prop");
			});

			assert.throws(function () {
				checks.add("prop", "validator");
			});

			assert.doesNotThrow(function () {
				checks.add("prop", enforce.required());
			});

			return done();
		});

		it("should allow adding a chained validator", function (done) {
		    assert.doesNotThrow(function () {
		        checks.add("prop", enforce.notEmptyString().ifDefined());
		    });

		    return done();
		});

		it("should allow adding legacy validators (<= 0.1.2)", function (done) {
		    assert.doesNotThrow(function () {
		        checks.add("prop", function (value, next) { });
		    });

		    assert.doesNotThrow(function () {
		        checks.add("prop", function (value, next, contexts) { });
		    });

		    return done();
		});
	});

	describe(".clear", function () {
	    var checks = new enforce.Enforce();

	    it("should have a .clear() method", function (done) {
	        assert.isFunction(checks.clear);
	        done();
	    });

		checks.add("prop", enforce.required());

		it("should clear all validators", function (done) {
			assert.greaterThan(Object.keys(checks.validations).length, 0);

			checks.clear();

			assert.equal(Object.keys(checks.validations).length, 0);

			return done();
		});
	});

	describe(".check (default options)", function () {
		it("should return no error if it's ok", function (done) {
			var checks = new enforce.Enforce();

			checks.add("prop", enforce.lists.inside([ 1, 2, 3 ]));
			checks.add("prop", enforce.lists.inside([ 3, 4, 5 ]));

			checks.check({
				prop : 3
			}, function (err) {
				assert.notExist(err);

				return done();
			});
		});

		it("should return after first error", function (done) {
			var checks = new enforce.Enforce();

			checks.add("prop", enforce.lists.inside([ 1, 2, 3 ], "first-error"));
			checks.add("prop", enforce.lists.inside([ 3, 4, 5 ], "last-error"));

			checks.check({
				prop : 6
			}, function (err) {
				assert.exist(err);

				assert.equal(err.msg, "first-error");

				return done();
			});
		});
	});

	describe(".check (returnAllErrors = true)", function () {
		it("should return no error if it's ok", function (done) {
			var checks = new enforce.Enforce({
				returnAllErrors : true
			});

			checks.add("prop", enforce.lists.inside([ 1, 2, 3 ]));
			checks.add("prop", enforce.lists.inside([ 3, 4, 5 ]));

			checks.check({
				prop : 3
			}, function (err) {
				assert.notExist(err);

				return done();
			});
		});

		it("should return after all validations", function (done) {
			var checks = new enforce.Enforce({
				returnAllErrors : true
			});

			checks.add("prop", enforce.lists.inside([ 1, 2, 3 ], "first-error"));
			checks.add("prop", enforce.lists.inside([ 3, 4, 5 ], "last-error"));

			checks.check({
				prop : 6
			}, function (err) {
				assert.exist(err);
				assert.isArray(err);

				assert.equal(err[0].msg, "first-error");
				assert.equal(err[1].msg, "last-error");

				return done();
			});
		});
	});
});
