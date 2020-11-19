"use strict";
exports.__esModule = true;
exports.StatementExpressionList = void 0;
var statement_expression_list_children_model_1 = require("./statement-expression-list-children.model");
var location_model_1 = require("./location.model");
var StatementExpressionList = /** @class */ (function () {
    function StatementExpressionList() {
        this.name = '';
        this.children = [new statement_expression_list_children_model_1.StatementExpressionListChildren()];
        this.location = new location_model_1.Location();
    }
    return StatementExpressionList;
}());
exports.StatementExpressionList = StatementExpressionList;
