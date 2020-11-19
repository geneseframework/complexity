"use strict";
exports.__esModule = true;
exports.NewExpression = void 0;
var location_model_1 = require("./location.model");
var new_expression_children_model_1 = require("./new-expression-children.model");
var NewExpression = /** @class */ (function () {
    function NewExpression() {
        this.name = '';
        this.children = new new_expression_children_model_1.NewExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return NewExpression;
}());
exports.NewExpression = NewExpression;
