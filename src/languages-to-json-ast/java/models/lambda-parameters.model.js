"use strict";
exports.__esModule = true;
exports.LambdaParameters = void 0;
var location_model_1 = require("./location.model");
var lambda_parameters_children_model_1 = require("./lambda-parameters-children.model");
var LambdaParameters = /** @class */ (function () {
    function LambdaParameters() {
        this.name = '';
        this.children = new lambda_parameters_children_model_1.LambdaParametersChildren();
        this.location = new location_model_1.Location();
    }
    return LambdaParameters;
}());
exports.LambdaParameters = LambdaParameters;
