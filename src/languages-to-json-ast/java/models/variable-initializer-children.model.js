"use strict";
exports.__esModule = true;
exports.VariableInitializerChildren = void 0;
var expression_model_1 = require("./expression.model");
var array_initializer_model_1 = require("./array-initializer.model");
var VariableInitializerChildren = /** @class */ (function () {
    function VariableInitializerChildren() {
        this.expression = [new expression_model_1.Expression()];
        this.arrayInitializer = [new array_initializer_model_1.ArrayInitializer()];
    }
    return VariableInitializerChildren;
}());
exports.VariableInitializerChildren = VariableInitializerChildren;
