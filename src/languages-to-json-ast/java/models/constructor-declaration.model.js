"use strict";
exports.__esModule = true;
exports.ConstructorDeclarationElement = void 0;
var constructor_declaration_children_model_1 = require("./constructor-declaration-children.model");
var location_model_1 = require("./location.model");
var ConstructorDeclarationElement = /** @class */ (function () {
    function ConstructorDeclarationElement() {
        this.name = '';
        this.children = new constructor_declaration_children_model_1.ConstructorDeclarationElementChildren();
        this.location = new location_model_1.Location();
    }
    return ConstructorDeclarationElement;
}());
exports.ConstructorDeclarationElement = ConstructorDeclarationElement;
