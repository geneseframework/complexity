"use strict";
exports.__esModule = true;
exports.ClassDeclarationElement = void 0;
var class_declaration_children_model_1 = require("./class-declaration-children.model");
var location_model_1 = require("./location.model");
var ClassDeclarationElement = /** @class */ (function () {
    function ClassDeclarationElement() {
        this.name = '';
        this.children = new class_declaration_children_model_1.ClassDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return ClassDeclarationElement;
}());
exports.ClassDeclarationElement = ClassDeclarationElement;
