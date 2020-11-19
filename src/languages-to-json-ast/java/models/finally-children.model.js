"use strict";
exports.__esModule = true;
exports.FinallyChildren = void 0;
var block_model_1 = require("./block.model");
var infos_model_1 = require("./infos.model");
var FinallyChildren = /** @class */ (function () {
    function FinallyChildren() {
        this.Finally = [new infos_model_1.Infos()];
        this.block = [new block_model_1.Block()];
    }
    return FinallyChildren;
}());
exports.FinallyChildren = FinallyChildren;
