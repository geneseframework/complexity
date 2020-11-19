"use strict";
exports.__esModule = true;
exports.InterfaceDeclaration = void 0;
var location_model_1 = require("./location.model");
var interface_declaration_children_model_1 = require("./interface-declaration-children.model");
var InterfaceDeclaration = /** @class */ (function () {
    function InterfaceDeclaration() {
        this.name = '';
        this.children = new interface_declaration_children_model_1.InterfaceDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return InterfaceDeclaration;
}());
exports.InterfaceDeclaration = InterfaceDeclaration;
