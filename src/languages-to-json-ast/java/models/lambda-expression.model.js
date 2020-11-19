"use strict";
exports.__esModule = true;
exports.LambdaExpression = void 0;
var location_model_1 = require("./location.model");
var lambda_expression_children_model_1 = require("./lambda-expression-children.model");
var LambdaExpression = /** @class */ (function () {
    function LambdaExpression() {
        this.name = '';
        this.children = new lambda_expression_children_model_1.LambdaExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return LambdaExpression;
}());
exports.LambdaExpression = LambdaExpression;
