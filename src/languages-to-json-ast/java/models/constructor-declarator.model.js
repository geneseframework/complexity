"use strict";
exports.__esModule = true;
exports.ConstructorDeclarator = void 0;
var constructor_declarator_children_model_1 = require("./constructor-declarator-children.model");
var location_model_1 = require("./location.model");
var ConstructorDeclarator = /** @class */ (function () {
    function ConstructorDeclarator() {
        this.name = '';
        this.children = new constructor_declarator_children_model_1.ConstructorDeclaratorChildren();
        this.location = new location_model_1.Location();
    }
    return ConstructorDeclarator;
}());
exports.ConstructorDeclarator = ConstructorDeclarator;
