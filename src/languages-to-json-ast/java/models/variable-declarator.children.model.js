"use strict";
exports.__esModule = true;
exports.VariableDeclaratorChildren = void 0;
var variable_declarator_id_model_1 = require("./variable-declarator-id.model");
var infos_model_1 = require("./infos.model");
var variable_initializer_model_1 = require("./variable-initializer.model");
var VariableDeclaratorChildren = /** @class */ (function () {
    function VariableDeclaratorChildren() {
        this.variableDeclaratorId = [new variable_declarator_id_model_1.VariableDeclaratorId()];
        this.Equals = [new infos_model_1.Infos()];
        this.variableInitializer = [new variable_initializer_model_1.VariableInitializer()];
    }
    return VariableDeclaratorChildren;
}());
exports.VariableDeclaratorChildren = VariableDeclaratorChildren;
