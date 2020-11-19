"use strict";
exports.__esModule = true;
exports.ClassBodyDeclarationChildren = void 0;
var class_member_declaration_element_model_1 = require("./class-member-declaration-element.model");
var constructor_declaration_model_1 = require("./constructor-declaration.model");
var ClassBodyDeclarationChildren = /** @class */ (function () {
    function ClassBodyDeclarationChildren() {
        this.classMemberDeclaration = [new class_member_declaration_element_model_1.ClassMemberDeclarationElement()];
        this.constructorDeclaration = [new constructor_declaration_model_1.ConstructorDeclarationElement()];
    }
    return ClassBodyDeclarationChildren;
}());
exports.ClassBodyDeclarationChildren = ClassBodyDeclarationChildren;
