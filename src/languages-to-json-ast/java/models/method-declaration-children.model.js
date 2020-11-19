"use strict";
exports.__esModule = true;
exports.MethodDeclarationChildren = void 0;
var method_modifier_model_1 = require("./method-modifier.model");
var method_header_model_1 = require("./method-header.model");
var method_body_model_1 = require("./method-body.model");
var MethodDeclarationChildren = /** @class */ (function () {
    function MethodDeclarationChildren() {
        this.methodModifier = [new method_modifier_model_1.MethodModifier()];
        this.methodHeader = [new method_header_model_1.MethodHeader()];
        this.methodBody = [new method_body_model_1.MethodBody()];
    }
    return MethodDeclarationChildren;
}());
exports.MethodDeclarationChildren = MethodDeclarationChildren;
