"use strict";
exports.__esModule = true;
exports.BlockChildren = void 0;
var infos_model_1 = require("./infos.model");
var block_statements_model_1 = require("./block-statements.model");
var BlockChildren = /** @class */ (function () {
    function BlockChildren() {
        this.LCurly = [new infos_model_1.Infos()];
        this.blockStatements = [new block_statements_model_1.BlockStatements()];
        this.RCurly = [new infos_model_1.Infos()];
    }
    return BlockChildren;
}());
exports.BlockChildren = BlockChildren;
