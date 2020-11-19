"use strict";
exports.__esModule = true;
exports.UnaryExpression = void 0;
var location_model_1 = require("./location.model");
var unary_expression_children_model_1 = require("./unary-expression-children.model");
var UnaryExpression = /** @class */ (function () {
    function UnaryExpression() {
        this.name = '';
        this.children = new unary_expression_children_model_1.UnaryExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return UnaryExpression;
}());
exports.UnaryExpression = UnaryExpression;
