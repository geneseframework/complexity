"use strict";
exports.__esModule = true;
exports.LambdaExpressionChildren = void 0;
var infos_model_1 = require("./infos.model");
var lambda_body_model_1 = require("./lambda-body.model");
var lambda_parameters_model_1 = require("./lambda-parameters.model");
var LambdaExpressionChildren = /** @class */ (function () {
    function LambdaExpressionChildren() {
        this.lambdaParameters = [new lambda_parameters_model_1.LambdaParameters()];
        this.Arrow = [new infos_model_1.Infos()];
        this.lambdaBody = [new lambda_body_model_1.LambdaBody()];
    }
    return LambdaExpressionChildren;
}());
exports.LambdaExpressionChildren = LambdaExpressionChildren;
