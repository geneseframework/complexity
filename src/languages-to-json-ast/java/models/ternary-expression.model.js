"use strict";
exports.__esModule = true;
exports.TernaryExpression = void 0;
var location_model_1 = require("./location.model");
var ternary_expression_children_model_1 = require("./ternary-expression-children.model");
var TernaryExpression = /** @class */ (function () {
    function TernaryExpression() {
        this.name = '';
        this.children = new ternary_expression_children_model_1.TernaryExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return TernaryExpression;
}());
exports.TernaryExpression = TernaryExpression;
