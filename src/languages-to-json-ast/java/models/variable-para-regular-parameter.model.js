"use strict";
exports.__esModule = true;
exports.VariableParaRegularParameter = void 0;
var variable_para_regular_parameter_children_model_1 = require("./variable-para-regular-parameter-children.model");
var location_model_1 = require("./location.model");
var VariableParaRegularParameter = /** @class */ (function () {
    function VariableParaRegularParameter() {
        this.name = '';
        this.children = new variable_para_regular_parameter_children_model_1.VariableParaRegularParameterChildren();
        this.location = new location_model_1.Location();
    }
    return VariableParaRegularParameter;
}());
exports.VariableParaRegularParameter = VariableParaRegularParameter;
