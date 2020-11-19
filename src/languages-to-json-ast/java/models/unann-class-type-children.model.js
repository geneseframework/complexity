"use strict";
exports.__esModule = true;
exports.UnannClassTypeChildren = void 0;
var infos_model_1 = require("./infos.model");
var type_arguments_model_1 = require("./type-arguments.model");
var UnannClassTypeChildren = /** @class */ (function () {
    function UnannClassTypeChildren() {
        this.Identifier = [new infos_model_1.Infos()];
        this.typeArguments = [new type_arguments_model_1.TypeArguments()];
    }
    return UnannClassTypeChildren;
}());
exports.UnannClassTypeChildren = UnannClassTypeChildren;
