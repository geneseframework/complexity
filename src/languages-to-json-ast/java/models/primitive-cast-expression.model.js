"use strict";
exports.__esModule = true;
exports.PrimitiveCastExpression = void 0;
var location_model_1 = require("./location.model");
var primitive_cast_expression_children_model_1 = require("./primitive-cast-expression-children.model");
var PrimitiveCastExpression = /** @class */ (function () {
    function PrimitiveCastExpression() {
        this.name = '';
        this.children = new primitive_cast_expression_children_model_1.PrimitiveCastExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return PrimitiveCastExpression;
}());
exports.PrimitiveCastExpression = PrimitiveCastExpression;
