"use strict";
exports.__esModule = true;
exports.InterfaceMethodDeclaration = void 0;
var location_model_1 = require("./location.model");
var interface_method_declaration_children_model_1 = require("./interface-method-declaration-children.model");
var InterfaceMethodDeclaration = /** @class */ (function () {
    function InterfaceMethodDeclaration() {
        this.name = '';
        this.children = new interface_method_declaration_children_model_1.InterfaceMethodDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return InterfaceMethodDeclaration;
}());
exports.InterfaceMethodDeclaration = InterfaceMethodDeclaration;
