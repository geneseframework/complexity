"use strict";
exports.__esModule = true;
exports.PrimaryChildren = void 0;
var primary_prefix_model_1 = require("./primary-prefix.model");
var primary_suffix_model_1 = require("./primary-suffix.model");
var PrimaryChildren = /** @class */ (function () {
    function PrimaryChildren() {
        this.primaryPrefix = [new primary_prefix_model_1.PrimaryPrefix()];
        this.primarySuffix = [new primary_suffix_model_1.PrimarySuffix()];
    }
    return PrimaryChildren;
}());
exports.PrimaryChildren = PrimaryChildren;
