"use strict";
exports.__esModule = true;
exports.ClassDeclarationChildren = void 0;
var class_modifier_element_model_1 = require("./class-modifier-element.model");
var normal_class_declaration_element_model_1 = require("./normal-class-declaration-element.model");
var ClassDeclarationChildren = /** @class */ (function () {
    function ClassDeclarationChildren() {
        this.classModifier = [new class_modifier_element_model_1.ClassModifierElement()];
        this.normalClassDeclaration = [new normal_class_declaration_element_model_1.NormalClassDeclarationElement()];
    }
    return ClassDeclarationChildren;
}());
exports.ClassDeclarationChildren = ClassDeclarationChildren;
