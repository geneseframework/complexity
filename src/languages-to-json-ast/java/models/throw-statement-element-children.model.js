"use strict";
exports.__esModule = true;
exports.ThrowStatementElementChildren = void 0;
var expression_model_1 = require("./expression.model");
var infos_model_1 = require("./infos.model");
var ThrowStatementElementChildren = /** @class */ (function () {
    function ThrowStatementElementChildren() {
        this.Throw = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
        this.Semi = [new expression_model_1.Expression()];
    }
    return ThrowStatementElementChildren;
}());
exports.ThrowStatementElementChildren = ThrowStatementElementChildren;
