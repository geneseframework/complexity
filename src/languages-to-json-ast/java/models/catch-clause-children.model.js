"use strict";
exports.__esModule = true;
exports.CatchClauseChildren = void 0;
var block_model_1 = require("./block.model");
var catch_formal_parameter_model_1 = require("./catch-formal-parameter.model");
var infos_model_1 = require("./infos.model");
var CatchClauseChildren = /** @class */ (function () {
    function CatchClauseChildren() {
        this.Catch = [new infos_model_1.Infos()];
        this.LBrace = [new infos_model_1.Infos()];
        this.catchFormalParameter = [
            new catch_formal_parameter_model_1.CatchFormalParameter(),
        ];
        this.RBrace = [new infos_model_1.Infos()];
        this.block = [new block_model_1.Block()];
    }
    return CatchClauseChildren;
}());
exports.CatchClauseChildren = CatchClauseChildren;
