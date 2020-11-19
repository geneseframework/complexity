"use strict";
exports.__esModule = true;
exports.NewExpressionChildren = void 0;
var infos_model_1 = require("./infos.model");
var unqualified_class_instance_creation_expression_model_1 = require("./unqualified-class-instance-creation-expression.model");
var array_creation_expression_model_1 = require("./array-creation-expression.model");
var NewExpressionChildren = /** @class */ (function () {
    function NewExpressionChildren() {
        this.Identifier = [new infos_model_1.Infos()];
        this.unqualifiedClassInstanceCreationExpression = [new unqualified_class_instance_creation_expression_model_1.UnqualifiedClassInstanceCreationExpression()];
        this.arrayCreationExpression = [new array_creation_expression_model_1.ArrayCreationExpression()];
    }
    return NewExpressionChildren;
}());
exports.NewExpressionChildren = NewExpressionChildren;
