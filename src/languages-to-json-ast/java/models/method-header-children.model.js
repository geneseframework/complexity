"use strict";
exports.__esModule = true;
exports.MethodHeaderChildren = void 0;
var result_model_1 = require("./result.model");
var method_declarator_model_1 = require("./method-declarator.model");
var throws_model_1 = require("./throws.model");
var MethodHeaderChildren = /** @class */ (function () {
    function MethodHeaderChildren() {
        this.result = [new result_model_1.Result()];
        this.methodDeclarator = [new method_declarator_model_1.MethodDeclarator()];
        this.throws = [new throws_model_1.Throws()];
    }
    return MethodHeaderChildren;
}());
exports.MethodHeaderChildren = MethodHeaderChildren;
