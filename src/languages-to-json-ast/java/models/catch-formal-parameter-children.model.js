"use strict";
exports.__esModule = true;
exports.CatchFormalParameterChildren = void 0;
var catch_type_model_1 = require("./catch-type.model");
var variable_declarator_id_model_1 = require("./variable-declarator-id.model");
var CatchFormalParameterChildren = /** @class */ (function () {
    function CatchFormalParameterChildren() {
        this.catchType = [new catch_type_model_1.CatchType()];
        this.variableDeclaratorId = [
            new variable_declarator_id_model_1.VariableDeclaratorId(),
        ];
    }
    return CatchFormalParameterChildren;
}());
exports.CatchFormalParameterChildren = CatchFormalParameterChildren;
