"use strict";
exports.__esModule = true;
exports.MethodDeclaratorChildren = void 0;
var infos_model_1 = require("./infos.model");
var formal_parameter_list_model_1 = require("./formal-parameter-list.model");
var MethodDeclaratorChildren = /** @class */ (function () {
    function MethodDeclaratorChildren() {
        this.Identifier = [new infos_model_1.Infos()];
        this.LBrace = [new infos_model_1.Infos()];
        this.formalParameterList = [new formal_parameter_list_model_1.FormalParameterList()];
        this.RBrace = [new infos_model_1.Infos()];
    }
    return MethodDeclaratorChildren;
}());
exports.MethodDeclaratorChildren = MethodDeclaratorChildren;
