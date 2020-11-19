"use strict";
exports.__esModule = true;
exports.Expression = void 0;
var location_model_1 = require("./location.model");
var expression_children_model_1 = require("./expression-children.model");
var Expression = /** @class */ (function () {
    function Expression() {
        this.name = '';
        this.children = new expression_children_model_1.ExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return Expression;
}());
exports.Expression = Expression;
