"use strict";
exports.__esModule = true;
exports.LocalVariableDeclaration = void 0;
var location_model_1 = require("./location.model");
var local_variable_declaration_children_model_1 = require("./local-variable-declaration-children.model");
var LocalVariableDeclaration = /** @class */ (function () {
    function LocalVariableDeclaration() {
        this.name = '';
        this.children = new local_variable_declaration_children_model_1.LocalVariableDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return LocalVariableDeclaration;
}());
exports.LocalVariableDeclaration = LocalVariableDeclaration;
