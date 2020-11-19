"use strict";
exports.__esModule = true;
exports.ReturnStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var expression_model_1 = require("./expression.model");
var ReturnStatementChildren = /** @class */ (function () {
    function ReturnStatementChildren() {
        this.Return = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
        this.Semicolon = [new infos_model_1.Infos()];
    }
    return ReturnStatementChildren;
}());
exports.ReturnStatementChildren = ReturnStatementChildren;
