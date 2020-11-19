"use strict";
exports.__esModule = true;
exports.ConstructorDeclarationElementChildren = void 0;
var constructor_body_model_1 = require("./constructor-body.model");
var constructor_declarator_model_1 = require("./constructor-declarator.model");
var constructor_modifier_model_1 = require("./constructor-modifier.model");
var ConstructorDeclarationElementChildren = /** @class */ (function () {
    function ConstructorDeclarationElementChildren() {
        this.constructorModifier = [new constructor_modifier_model_1.ConstructorModifier()];
        this.constructorDeclarator = [new constructor_declarator_model_1.ConstructorDeclarator()];
        this.constructorBody = [new constructor_body_model_1.ConstructorBody()];
    }
    return ConstructorDeclarationElementChildren;
}());
exports.ConstructorDeclarationElementChildren = ConstructorDeclarationElementChildren;
