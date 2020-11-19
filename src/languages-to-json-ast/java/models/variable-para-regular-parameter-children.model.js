"use strict";
exports.__esModule = true;
exports.VariableParaRegularParameterChildren = void 0;
var unann_type_model_1 = require("./unann-type.model");
var variable_declarator_id_model_1 = require("./variable-declarator-id.model");
var VariableParaRegularParameterChildren = /** @class */ (function () {
    function VariableParaRegularParameterChildren() {
        this.unannType = [new unann_type_model_1.UnannType()];
        this.variableDeclaratorId = [new variable_declarator_id_model_1.VariableDeclaratorId()];
    }
    return VariableParaRegularParameterChildren;
}());
exports.VariableParaRegularParameterChildren = VariableParaRegularParameterChildren;
