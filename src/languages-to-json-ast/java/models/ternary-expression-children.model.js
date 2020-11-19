"use strict";
exports.__esModule = true;
exports.TernaryExpressionChildren = void 0;
var binary_expression_model_1 = require("./binary-expression.model");
var expression_model_1 = require("./expression.model");
var infos_model_1 = require("./infos.model");
var TernaryExpressionChildren = /** @class */ (function () {
    function TernaryExpressionChildren() {
        this.binaryExpression = [new binary_expression_model_1.BinaryExpression()];
        this.expression = [new expression_model_1.Expression()];
        this.QuestionMark = [new infos_model_1.Infos()];
        this.Colon = [new infos_model_1.Infos()];
    }
    return TernaryExpressionChildren;
}());
exports.TernaryExpressionChildren = TernaryExpressionChildren;
