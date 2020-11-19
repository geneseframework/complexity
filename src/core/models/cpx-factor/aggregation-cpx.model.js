"use strict";
exports.__esModule = true;
exports.AggregationCpx = void 0;
/**
 * The Complexity Category "Aggregation"
 */
var AggregationCpx = /** @class */ (function () {
    function AggregationCpx() {
        this.arr = 0; // Array of arrays
        this.density = 0; // Accumulation of nodes on a same line of code
        this.differentLogicDoor = 0; // a "or" after a "and" (or a "or" after a "and") without brackets
        this.regex = 0; // each element in a regex
    }
    return AggregationCpx;
}());
exports.AggregationCpx = AggregationCpx;
