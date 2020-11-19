"use strict";
exports.__esModule = true;
exports.UnaryExpressionChildren = void 0;
var primary_model_1 = require("./primary.model");
var infos_model_1 = require("./infos.model");
var UnaryExpressionChildren = /** @class */ (function () {
    function UnaryExpressionChildren() {
        this.primary = [new primary_model_1.Primary()];
        this.UnaryPrefixOperator = [new infos_model_1.Infos()];
        this.UnarySuffixOperator = [new infos_model_1.Infos()];
    }
    return UnaryExpressionChildren;
}());
exports.UnaryExpressionChildren = UnaryExpressionChildren;
