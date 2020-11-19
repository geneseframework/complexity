"use strict";
exports.__esModule = true;
exports.ConstantExpression = void 0;
var location_model_1 = require("./location.model");
var constant_expression_children_model_1 = require("./constant-expression-children.model");
var ConstantExpression = /** @class */ (function () {
    function ConstantExpression() {
        this.name = '';
        this.children = new constant_expression_children_model_1.ConstantExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return ConstantExpression;
}());
exports.ConstantExpression = ConstantExpression;
