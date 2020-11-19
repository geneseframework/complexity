"use strict";
exports.__esModule = true;
exports.CatchFormalParameter = void 0;
var catch_formal_parameter_children_model_1 = require("./catch-formal-parameter-children.model");
var location_model_1 = require("./location.model");
var CatchFormalParameter = /** @class */ (function () {
    function CatchFormalParameter() {
        this.name = '';
        this.children = new catch_formal_parameter_children_model_1.CatchFormalParameterChildren();
        this.location = new location_model_1.Location();
    }
    return CatchFormalParameter;
}());
exports.CatchFormalParameter = CatchFormalParameter;
