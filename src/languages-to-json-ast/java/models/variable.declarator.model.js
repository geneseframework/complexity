"use strict";
exports.__esModule = true;
exports.VariableDeclarator = void 0;
var location_model_1 = require("./location.model");
var variable_declarator_children_model_1 = require("./variable-declarator.children.model");
var VariableDeclarator = /** @class */ (function () {
    function VariableDeclarator() {
        this.name = '';
        this.children = new variable_declarator_children_model_1.VariableDeclaratorChildren();
        this.location = new location_model_1.Location();
    }
    return VariableDeclarator;
}());
exports.VariableDeclarator = VariableDeclarator;
