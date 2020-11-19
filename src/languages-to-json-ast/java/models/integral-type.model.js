"use strict";
exports.__esModule = true;
exports.IntegralType = void 0;
var location_model_1 = require("./location.model");
var integral_type_children_model_1 = require("./integral-type-children.model");
var IntegralType = /** @class */ (function () {
    function IntegralType() {
        this.name = '';
        this.children = new integral_type_children_model_1.IntegralTypeChildren();
        this.location = new location_model_1.Location();
    }
    return IntegralType;
}());
exports.IntegralType = IntegralType;
