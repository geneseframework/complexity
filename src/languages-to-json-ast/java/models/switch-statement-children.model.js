"use strict";
exports.__esModule = true;
exports.SwitchStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var expression_model_1 = require("./expression.model");
var switch_block_model_1 = require("./switch-block.model");
var SwitchStatementChildren = /** @class */ (function () {
    function SwitchStatementChildren() {
        this.Switch = [new infos_model_1.Infos()];
        this.LBrace = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
        this.BBrace = [new infos_model_1.Infos()];
        this.switchBlock = [new switch_block_model_1.SwitchBlock()];
    }
    return SwitchStatementChildren;
}());
exports.SwitchStatementChildren = SwitchStatementChildren;
