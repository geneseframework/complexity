"use strict";
exports.__esModule = true;
exports.UnqualifiedClassInstanceCreationExpression = void 0;
var location_model_1 = require("./location.model");
var unqualified_class_instance_creation_expression_children_model_1 = require("./unqualified-class-instance-creation-expression-children.model");
var UnqualifiedClassInstanceCreationExpression = /** @class */ (function () {
    function UnqualifiedClassInstanceCreationExpression() {
        this.name = '';
        this.children = new unqualified_class_instance_creation_expression_children_model_1.UnqualifiedClassInstanceCreationExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return UnqualifiedClassInstanceCreationExpression;
}());
exports.UnqualifiedClassInstanceCreationExpression = UnqualifiedClassInstanceCreationExpression;
