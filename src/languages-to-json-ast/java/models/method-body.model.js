"use strict";
exports.__esModule = true;
exports.MethodBody = void 0;
var location_model_1 = require("./location.model");
var method_body_children_model_1 = require("./method-body-children.model");
var MethodBody = /** @class */ (function () {
    function MethodBody() {
        this.name = '';
        this.children = new method_body_children_model_1.MethodBodyChildren();
        this.location = new location_model_1.Location();
    }
    return MethodBody;
}());
exports.MethodBody = MethodBody;
