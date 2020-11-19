"use strict";
exports.__esModule = true;
exports.ExpressionStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var statement_expression_model_1 = require("./statement-expression.model");
var ExpressionStatementChildren = /** @class */ (function () {
    function ExpressionStatementChildren() {
        this.statementExpression = [new statement_expression_model_1.StatementExpression()];
        this.Semicolon = [new infos_model_1.Infos()];
    }
    return ExpressionStatementChildren;
}());
exports.ExpressionStatementChildren = ExpressionStatementChildren;
