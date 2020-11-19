"use strict";
exports.__esModule = true;
exports.LocalVariableDeclarationStatementChildren = void 0;
var local_variable_declaration_model_1 = require("./local-variable-declaration.model");
var infos_model_1 = require("./infos.model");
var LocalVariableDeclarationStatementChildren = /** @class */ (function () {
    function LocalVariableDeclarationStatementChildren() {
        this.localVariableDeclaration = [new local_variable_declaration_model_1.LocalVariableDeclaration()];
        this.Semicolon = [new infos_model_1.Infos()];
    }
    return LocalVariableDeclarationStatementChildren;
}());
exports.LocalVariableDeclarationStatementChildren = LocalVariableDeclarationStatementChildren;
