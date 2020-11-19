"use strict";
exports.__esModule = true;
exports.NumericType = void 0;
var location_model_1 = require("./location.model");
var numeric_type_children_model_1 = require("./numeric-type-children.model");
var NumericType = /** @class */ (function () {
    function NumericType() {
        this.name = '';
        this.children = new numeric_type_children_model_1.NumericTypeChildren();
        this.location = new location_model_1.Location();
    }
    return NumericType;
}());
exports.NumericType = NumericType;
