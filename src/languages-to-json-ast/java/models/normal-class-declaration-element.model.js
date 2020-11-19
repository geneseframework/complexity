"use strict";
exports.__esModule = true;
exports.NormalClassDeclarationElement = void 0;
var normal_class_declaration_children_model_1 = require("./normal-class-declaration-children.model");
var location_model_1 = require("./location.model");
var NormalClassDeclarationElement = /** @class */ (function () {
    function NormalClassDeclarationElement() {
        this.name = '';
        this.children = new normal_class_declaration_children_model_1.NormalClassDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return NormalClassDeclarationElement;
}());
exports.NormalClassDeclarationElement = NormalClassDeclarationElement;
