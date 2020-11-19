"use strict";
exports.__esModule = true;
exports.ClassBodyDeclarationElement = void 0;
var location_model_1 = require("./location.model");
var class_body_declaration_children_model_1 = require("./class-body-declaration-children.model");
var ClassBodyDeclarationElement = /** @class */ (function () {
    function ClassBodyDeclarationElement() {
        this.name = '';
        this.children = new class_body_declaration_children_model_1.ClassBodyDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return ClassBodyDeclarationElement;
}());
exports.ClassBodyDeclarationElement = ClassBodyDeclarationElement;
