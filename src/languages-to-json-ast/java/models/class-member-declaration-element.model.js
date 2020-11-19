"use strict";
exports.__esModule = true;
exports.ClassMemberDeclarationElement = void 0;
var location_model_1 = require("./location.model");
var class_member_declaration_children_model_1 = require("./class-member-declaration-children.model");
var ClassMemberDeclarationElement = /** @class */ (function () {
    function ClassMemberDeclarationElement() {
        this.name = '';
        this.children = new class_member_declaration_children_model_1.ClassMemberDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return ClassMemberDeclarationElement;
}());
exports.ClassMemberDeclarationElement = ClassMemberDeclarationElement;
