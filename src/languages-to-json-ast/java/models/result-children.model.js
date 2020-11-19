"use strict";
exports.__esModule = true;
exports.ResultChildren = void 0;
var infos_model_1 = require("./infos.model");
var unann_type_model_1 = require("./unann-type.model");
var ResultChildren = /** @class */ (function () {
    function ResultChildren() {
        this.Void = [new infos_model_1.Infos()];
        this.unannType = [new unann_type_model_1.UnannType()];
    }
    return ResultChildren;
}());
exports.ResultChildren = ResultChildren;
