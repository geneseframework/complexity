"use strict";
exports.__esModule = true;
exports.MethodInvocationSuffix = void 0;
var location_model_1 = require("./location.model");
var method_invocation_suffix_children_model_1 = require("./method-invocation-suffix-children.model");
var MethodInvocationSuffix = /** @class */ (function () {
    function MethodInvocationSuffix() {
        this.name = '';
        this.children = new method_invocation_suffix_children_model_1.MethodInvocationSuffixChildren();
        this.location = new location_model_1.Location();
    }
    return MethodInvocationSuffix;
}());
exports.MethodInvocationSuffix = MethodInvocationSuffix;
