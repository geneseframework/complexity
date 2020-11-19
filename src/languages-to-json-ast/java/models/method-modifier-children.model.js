"use strict";
exports.__esModule = true;
exports.MethodModifierChildren = void 0;
var infos_model_1 = require("./infos.model");
var MethodModifierChildren = /** @class */ (function () {
    function MethodModifierChildren() {
        this.Private = [new infos_model_1.Infos()];
        this.Protected = [new infos_model_1.Infos()];
        this.Public = [new infos_model_1.Infos()];
        this.Static = [new infos_model_1.Infos()];
    }
    return MethodModifierChildren;
}());
exports.MethodModifierChildren = MethodModifierChildren;
