"use strict";
exports.__esModule = true;
exports.LocalVariableDeclarationStatement = void 0;
var location_model_1 = require("./location.model");
var local_variable_declaration_statement_children_model_1 = require("./local-variable-declaration-statement-children.model");
var LocalVariableDeclarationStatement = /** @class */ (function () {
    function LocalVariableDeclarationStatement() {
        this.name = '';
        this.children = new local_variable_declaration_statement_children_model_1.LocalVariableDeclarationStatementChildren();
        this.location = new location_model_1.Location();
    }
    return LocalVariableDeclarationStatement;
}());
exports.LocalVariableDeclarationStatement = LocalVariableDeclarationStatement;
