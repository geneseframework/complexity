"use strict";
exports.__esModule = true;
exports.TypeArgumentsChildren = void 0;
var infos_model_1 = require("./infos.model");
var type_argument_list_model_1 = require("./type-argument-list.model");
var TypeArgumentsChildren = /** @class */ (function () {
    function TypeArgumentsChildren() {
        this.Less = [new infos_model_1.Infos()];
        this.typeArgumentList = [new type_argument_list_model_1.TypeArgumentList()];
        this.Greater = [new infos_model_1.Infos()];
    }
    return TypeArgumentsChildren;
}());
exports.TypeArgumentsChildren = TypeArgumentsChildren;
