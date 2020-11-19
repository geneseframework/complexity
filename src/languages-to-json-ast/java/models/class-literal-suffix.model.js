"use strict";
exports.__esModule = true;
exports.ClassLiteralSuffix = void 0;
var location_model_1 = require("./location.model");
var class_literal_suffix_children_model_1 = require("./class-literal-suffix-children.model");
var ClassLiteralSuffix = /** @class */ (function () {
    function ClassLiteralSuffix() {
        this.name = '';
        this.children = new class_literal_suffix_children_model_1.ClassLiteralSuffixChildren();
        this.location = new location_model_1.Location();
    }
    return ClassLiteralSuffix;
}());
exports.ClassLiteralSuffix = ClassLiteralSuffix;
