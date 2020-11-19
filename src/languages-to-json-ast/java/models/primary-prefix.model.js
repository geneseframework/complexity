"use strict";
exports.__esModule = true;
exports.PrimaryPrefix = void 0;
var location_model_1 = require("./location.model");
var primary_prefix_children_model_1 = require("./primary-prefix-children.model");
var PrimaryPrefix = /** @class */ (function () {
    function PrimaryPrefix() {
        this.name = '';
        this.children = new primary_prefix_children_model_1.PrimaryPrefixChildren();
        this.location = new location_model_1.Location();
    }
    return PrimaryPrefix;
}());
exports.PrimaryPrefix = PrimaryPrefix;
