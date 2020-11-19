"use strict";
exports.__esModule = true;
exports.SwitchLabelChildren = void 0;
var infos_model_1 = require("./infos.model");
var constant_expression_model_1 = require("./constant-expression.model");
var SwitchLabelChildren = /** @class */ (function () {
    function SwitchLabelChildren() {
        this.Case = [new infos_model_1.Infos()];
        this.constantExpression = [new constant_expression_model_1.ConstantExpression()];
        this.Colon = [new infos_model_1.Infos()];
    }
    return SwitchLabelChildren;
}());
exports.SwitchLabelChildren = SwitchLabelChildren;
