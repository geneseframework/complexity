"use strict";
exports.__esModule = true;
exports.WeightsService = void 0;
var globals_const_1 = require("../../globals.const");
/**
 * Manages the custom Node weights added with libraries-weights Json files
 */
var WeightsService = /** @class */ (function () {
    function WeightsService() {
    }
    /**
     * Merges the libraries-weights Json files
     */
    WeightsService.merge = function () {
        try {
            var index = require('./index.json');
            var weights = {};
            for (var _i = 0, _a = Object.keys(index); _i < _a.length; _i++) {
                var library = _a[_i];
                weights[library] = require(index[library]);
            }
            return weights;
        }
        catch (err) {
            throw Error('Error merging libraries-weights : please verify paths in index.json and libraries-weights Json format');
        }
    };
    /**
     * Returns the names of the methods included in the libraries-weights Json files
     */
    WeightsService.weightedMethods = function () {
        var methods = [];
        for (var _i = 0, _a = Object.keys(globals_const_1.WEIGHTS); _i < _a.length; _i++) {
            var library = _a[_i];
            methods = methods.concat(Object.keys(globals_const_1.WEIGHTS[library]));
        }
        return methods;
    };
    return WeightsService;
}());
exports.WeightsService = WeightsService;
