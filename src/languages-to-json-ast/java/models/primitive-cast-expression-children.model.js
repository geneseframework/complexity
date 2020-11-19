"use strict";
exports.__esModule = true;
exports.PrimitiveCastExpressionChildren = void 0;
var unary_expression_model_1 = require("./unary-expression.model");
var primitive_type_model_1 = require("./primitive-type.model");
var PrimitiveCastExpressionChildren = /** @class */ (function () {
    function PrimitiveCastExpressionChildren() {
        this.primitiveType = [new primitive_type_model_1.PrimitiveType()];
        this.unaryExpression = [new unary_expression_model_1.UnaryExpression()];
    }
    return PrimitiveCastExpressionChildren;
}());
exports.PrimitiveCastExpressionChildren = PrimitiveCastExpressionChildren;
