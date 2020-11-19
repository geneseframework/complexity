"use strict";
exports.__esModule = true;
exports.NumericTypeChildren = void 0;
var integral_type_model_1 = require("./integral-type.model");
var floating_point_type_model_1 = require("./floating-point-type.model");
var NumericTypeChildren = /** @class */ (function () {
    function NumericTypeChildren() {
        this.integralType = [new integral_type_model_1.IntegralType()];
        this.floatingPointType = [new floating_point_type_model_1.FloatingPointType()];
    }
    return NumericTypeChildren;
}());
exports.NumericTypeChildren = NumericTypeChildren;
