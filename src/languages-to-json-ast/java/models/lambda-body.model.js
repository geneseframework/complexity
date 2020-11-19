"use strict";
exports.__esModule = true;
exports.LambdaBody = void 0;
var location_model_1 = require("./location.model");
var lambda_body_children_model_1 = require("./lambda-body-children.model");
var LambdaBody = /** @class */ (function () {
    function LambdaBody() {
        this.name = '';
        this.children = new lambda_body_children_model_1.LambdaBodyChildren();
        this.location = new location_model_1.Location();
    }
    return LambdaBody;
}());
exports.LambdaBody = LambdaBody;
