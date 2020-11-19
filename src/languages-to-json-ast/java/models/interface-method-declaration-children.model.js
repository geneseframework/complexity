"use strict";
exports.__esModule = true;
exports.InterfaceMethodDeclarationChildren = void 0;
var method_body_model_1 = require("./method-body.model");
var method_header_model_1 = require("./method-header.model");
var InterfaceMethodDeclarationChildren = /** @class */ (function () {
    function InterfaceMethodDeclarationChildren() {
        this.methodHeader = [new method_header_model_1.MethodHeader()];
        this.methodBody = [new method_body_model_1.MethodBody()];
    }
    return InterfaceMethodDeclarationChildren;
}());
exports.InterfaceMethodDeclarationChildren = InterfaceMethodDeclarationChildren;
