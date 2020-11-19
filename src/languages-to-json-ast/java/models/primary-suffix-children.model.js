"use strict";
exports.__esModule = true;
exports.PrimarySuffixChildren = void 0;
var infos_model_1 = require("./infos.model");
var method_invocation_suffix_model_1 = require("./method-invocation-suffix.model");
var class_literal_suffix_model_1 = require("./class-literal-suffix.model");
var method_reference_suffix_model_1 = require("./method-reference-suffix.model");
var PrimarySuffixChildren = /** @class */ (function () {
    function PrimarySuffixChildren() {
        this.Identifier = [new infos_model_1.Infos()];
        this.methodInvocationSuffix = [new method_invocation_suffix_model_1.MethodInvocationSuffix()];
        this.classLiteralSuffix = [new class_literal_suffix_model_1.ClassLiteralSuffix()];
        this.methodReferenceSuffix = [new method_reference_suffix_model_1.MethodReferenceSuffix()];
    }
    return PrimarySuffixChildren;
}());
exports.PrimarySuffixChildren = PrimarySuffixChildren;
