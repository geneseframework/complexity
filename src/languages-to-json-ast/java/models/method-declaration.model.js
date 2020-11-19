"use strict";
exports.__esModule = true;
exports.MethodDeclaration = void 0;
var location_model_1 = require("./location.model");
var method_declaration_children_model_1 = require("./method-declaration-children.model");
var MethodDeclaration = /** @class */ (function () {
    function MethodDeclaration() {
        this.name = '';
        this.children = new method_declaration_children_model_1.MethodDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return MethodDeclaration;
}());
exports.MethodDeclaration = MethodDeclaration;
