"use strict";
exports.__esModule = true;
exports.StatementExpression = void 0;
var location_model_1 = require("./location.model");
var statement_expression_children_model_1 = require("./statement-expression-children.model");
var StatementExpression = /** @class */ (function () {
    function StatementExpression() {
        this.name = '';
        this.children = [new statement_expression_children_model_1.StatementExpressionChildren()];
        this.location = new location_model_1.Location();
    }
    return StatementExpression;
}());
exports.StatementExpression = StatementExpression;
