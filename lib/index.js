/// <reference path="enforce.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("./enforcements/common");
exports.Enforce = require("./enforce");
exports.Validator = require("./validator");
exports.lists = require("./enforcements/lists");
exports.ranges = require("./enforcements/ranges");
exports.patterns = require("./enforcements/patterns");
exports.security = require("./enforcements/security");
//Force TypeScript compiler to output our inputs (otherwise it optimizes them away)
exports.Enforce.hasOwnProperty('x');
exports.Validator.hasOwnProperty('x');
exports.lists.hasOwnProperty('x');
exports.ranges.hasOwnProperty('x');
exports.patterns.hasOwnProperty('x');
exports.security.hasOwnProperty('x');
for (var k in common) {
    exports[k] = common[k];
}
