"use strict";
exports.__esModule = true;
exports.ArrayCreationExpression = void 0;
var location_model_1 = require("./location.model");
var array_creation_expression_children_model_1 = require("./array-creation-expression-children.model");
var ArrayCreationExpression = /** @class */ (function () {
    function ArrayCreationExpression() {
        this.name = '';
        this.children = new array_creation_expression_children_model_1.ArrayCreationExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return ArrayCreationExpression;
}());
exports.ArrayCreationExpression = ArrayCreationExpression;
