"use strict";
exports.__esModule = true;
exports.MethodReferenceSuffix = void 0;
var location_model_1 = require("./location.model");
var method_reference_suffix_children_model_1 = require("./method-reference-suffix-children.model");
var MethodReferenceSuffix = /** @class */ (function () {
    function MethodReferenceSuffix() {
        this.name = '';
        this.children = new method_reference_suffix_children_model_1.MethodReferenceSuffixChildren();
        this.location = new location_model_1.Location();
    }
    return MethodReferenceSuffix;
}());
exports.MethodReferenceSuffix = MethodReferenceSuffix;
