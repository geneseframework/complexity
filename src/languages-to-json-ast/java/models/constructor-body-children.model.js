"use strict";
exports.__esModule = true;
exports.ConstructorBodyChildren = void 0;
var block_statements_model_1 = require("./block-statements.model");
var infos_model_1 = require("./infos.model");
var ConstructorBodyChildren = /** @class */ (function () {
    function ConstructorBodyChildren() {
        this.LCurly = [new infos_model_1.Infos()];
        this.RCurly = [new infos_model_1.Infos()];
        this.blockStatements = [new block_statements_model_1.BlockStatements()];
    }
    return ConstructorBodyChildren;
}());
exports.ConstructorBodyChildren = ConstructorBodyChildren;
