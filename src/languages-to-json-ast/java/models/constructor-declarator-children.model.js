"use strict";
exports.__esModule = true;
exports.ConstructorDeclaratorChildren = void 0;
var formal_parameter_list_model_1 = require("./formal-parameter-list.model");
var infos_model_1 = require("./infos.model");
var simple_type_name_model_1 = require("./simple-type-name.model");
var ConstructorDeclaratorChildren = /** @class */ (function () {
    function ConstructorDeclaratorChildren() {
        this.LBrace = [new infos_model_1.Infos()];
        this.RBrace = [new infos_model_1.Infos()];
        this.simpleTypeName = [new simple_type_name_model_1.SimpleTypeName()];
        this.formalParameterList = [new formal_parameter_list_model_1.FormalParameterList()];
    }
    return ConstructorDeclaratorChildren;
}());
exports.ConstructorDeclaratorChildren = ConstructorDeclaratorChildren;
