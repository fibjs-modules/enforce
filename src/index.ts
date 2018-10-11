/// <reference path="../@types/index.d.ts" />

import common = require('./enforcements/common');
export import Enforce = require('./enforce');
export import Validator = require('./validator');
export import lists = require('./enforcements/lists');
export import ranges = require('./enforcements/ranges');
export import patterns = require('./enforcements/patterns');
export import security = require('./enforcements/security');

//Force TypeScript compiler to output our inputs (otherwise it optimizes them away)
Enforce.hasOwnProperty('x');
Validator.hasOwnProperty('x');
lists.hasOwnProperty('x');
ranges.hasOwnProperty('x');
patterns.hasOwnProperty('x');
security.hasOwnProperty('x');

for (var k in common) {
    exports[k] = common[k];
}
