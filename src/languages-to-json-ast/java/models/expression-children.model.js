"use strict";
exports.__esModule = true;
exports.ExpressionChildren = void 0;
var ternary_expression_model_1 = require("./ternary-expression.model");
var lambda_expression_model_1 = require("./lambda-expression.model");
var new_expression_model_1 = require("./new-expression.model");
var ExpressionChildren = /** @class */ (function () {
    function ExpressionChildren() {
        this.ternaryExpression = [new ternary_expression_model_1.TernaryExpression()];
        this.lambdaExpression = [new lambda_expression_model_1.LambdaExpression()];
        this.NewExpression = [new new_expression_model_1.NewExpression()];
    }
    return ExpressionChildren;
}());
exports.ExpressionChildren = ExpressionChildren;
