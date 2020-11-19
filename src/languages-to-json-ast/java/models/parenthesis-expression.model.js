"use strict";
exports.__esModule = true;
exports.ParenthesisExpression = void 0;
var location_model_1 = require("./location.model");
var parenthesis_expression_children_model_1 = require("./parenthesis-expression-children.model");
var ParenthesisExpression = /** @class */ (function () {
    function ParenthesisExpression() {
        this.name = '';
        this.children = new parenthesis_expression_children_model_1.ParenthesisExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return ParenthesisExpression;
}());
exports.ParenthesisExpression = ParenthesisExpression;
