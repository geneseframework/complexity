"use strict";
exports.__esModule = true;
exports.BinaryExpression = void 0;
var location_model_1 = require("./location.model");
var binary_expression_children_model_1 = require("./binary-expression-children.model");
var BinaryExpression = /** @class */ (function () {
    function BinaryExpression() {
        this.name = '';
        this.children = new binary_expression_children_model_1.BinaryExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return BinaryExpression;
}());
exports.BinaryExpression = BinaryExpression;
