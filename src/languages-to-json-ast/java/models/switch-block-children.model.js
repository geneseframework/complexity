"use strict";
exports.__esModule = true;
exports.SwitchBlockChildren = void 0;
var infos_model_1 = require("./infos.model");
var switch_case_model_1 = require("./switch-case.model");
var SwitchBlockChildren = /** @class */ (function () {
    function SwitchBlockChildren() {
        this.LCurly = [new infos_model_1.Infos()];
        this.switchCase = [new switch_case_model_1.SwitchCase()];
        this.RCurly = [new infos_model_1.Infos()];
    }
    return SwitchBlockChildren;
}());
exports.SwitchBlockChildren = SwitchBlockChildren;
