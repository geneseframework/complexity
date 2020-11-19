"use strict";
exports.__esModule = true;
exports.TryStatementChildren = void 0;
var block_model_1 = require("./block.model");
var catches_model_1 = require("./catches.model");
var finally_model_1 = require("./finally.model");
var infos_model_1 = require("./infos.model");
var TryStatementChildren = /** @class */ (function () {
    function TryStatementChildren() {
        this.Try = [new infos_model_1.Infos()];
        this.block = [new block_model_1.Block()];
        this.catches = [new catches_model_1.Catches()];
        this["finally"] = [new finally_model_1.Finally()];
    }
    return TryStatementChildren;
}());
exports.TryStatementChildren = TryStatementChildren;
