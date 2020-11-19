"use strict";
exports.__esModule = true;
exports.BlockStatementChildren = void 0;
var statement_model_1 = require("./statement.model");
var local_variable_declaration_statement_model_1 = require("./local-variable-declaration-statement.model");
var BlockStatementChildren = /** @class */ (function () {
    function BlockStatementChildren() {
        this.statement = [new statement_model_1.Statement()];
        this.localVariableDeclarationStatement = [new local_variable_declaration_statement_model_1.LocalVariableDeclarationStatement()];
    }
    return BlockStatementChildren;
}());
exports.BlockStatementChildren = BlockStatementChildren;
