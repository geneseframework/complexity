"use strict";
exports.__esModule = true;
exports.AssertStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var expression_model_1 = require("./expression.model");
var AssertStatementChildren = /** @class */ (function () {
    function AssertStatementChildren() {
        this.Assert = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
    }
    return AssertStatementChildren;
}());
exports.AssertStatementChildren = AssertStatementChildren;
