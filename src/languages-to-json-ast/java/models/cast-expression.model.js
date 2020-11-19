"use strict";
exports.__esModule = true;
exports.CastExpression = void 0;
var location_model_1 = require("./location.model");
var cast_expression_children_model_1 = require("./cast-expression-children.model");
var CastExpression = /** @class */ (function () {
    function CastExpression() {
        this.name = '';
        this.children = new cast_expression_children_model_1.CastExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return CastExpression;
}());
exports.CastExpression = CastExpression;
