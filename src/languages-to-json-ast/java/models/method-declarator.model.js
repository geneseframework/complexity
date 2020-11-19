"use strict";
exports.__esModule = true;
exports.MethodDeclarator = void 0;
var location_model_1 = require("./location.model");
var method_declarator_children_model_1 = require("./method-declarator-children.model");
var MethodDeclarator = /** @class */ (function () {
    function MethodDeclarator() {
        this.name = '';
        this.children = new method_declarator_children_model_1.MethodDeclaratorChildren();
        this.location = new location_model_1.Location();
    }
    return MethodDeclarator;
}());
exports.MethodDeclarator = MethodDeclarator;
