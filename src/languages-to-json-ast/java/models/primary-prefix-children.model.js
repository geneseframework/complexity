"use strict";
exports.__esModule = true;
exports.PrimaryPrefixChildren = void 0;
var fqn_or_ref_type_model_1 = require("./fqn-or-ref-type.model");
var literal_model_1 = require("./literal.model");
var parenthesis_expression_children_model_1 = require("./parenthesis-expression-children.model");
var infos_model_1 = require("./infos.model");
var new_expression_model_1 = require("./new-expression.model");
var cast_expression_model_1 = require("./cast-expression.model");
var PrimaryPrefixChildren = /** @class */ (function () {
    function PrimaryPrefixChildren() {
        this.fqnOrRefType = [new fqn_or_ref_type_model_1.FqnOrRefType()];
        this.literal = [new literal_model_1.Literal()];
        this.parenthesisExpression = [new parenthesis_expression_children_model_1.ParenthesisExpressionChildren()];
        this.This = [new infos_model_1.Infos()];
        this.newExpression = [new new_expression_model_1.NewExpression()];
        this.castExpression = [new cast_expression_model_1.CastExpression()];
    }
    return PrimaryPrefixChildren;
}());
exports.PrimaryPrefixChildren = PrimaryPrefixChildren;
