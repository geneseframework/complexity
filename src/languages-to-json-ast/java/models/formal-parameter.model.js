"use strict";
exports.__esModule = true;
exports.FormalParameter = void 0;
var formal_parameter_children_model_1 = require("./formal-parameter-children.model");
var location_model_1 = require("./location.model");
var FormalParameter = /** @class */ (function () {
    function FormalParameter() {
        this.name = '';
        this.children = new formal_parameter_children_model_1.FormalParameterChildren();
        this.location = new location_model_1.Location();
    }
    return FormalParameter;
}());
exports.FormalParameter = FormalParameter;
