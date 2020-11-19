"use strict";
exports.__esModule = true;
exports.StatementChildren = void 0;
var if_statement_model_1 = require("./if-statement.model");
var statement_without_trailing_sub_statement_model_1 = require("./statement-without-trailing-sub-statement.model");
var while_statement_model_1 = require("./while-statement.model");
var for_statement_model_1 = require("./for-statement.model");
var StatementChildren = /** @class */ (function () {
    function StatementChildren() {
        this.ifStatement = [new if_statement_model_1.IfStatement()];
        this.forStatement = [new for_statement_model_1.ForStatement()];
        this.statementWithoutTrailingSubstatement = [new statement_without_trailing_sub_statement_model_1.StatementWithoutTrailingSubstatement()];
        this.whileStatement = [new while_statement_model_1.WhileStatement()];
    }
    return StatementChildren;
}());
exports.StatementChildren = StatementChildren;
