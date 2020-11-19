"use strict";
exports.__esModule = true;
exports.FloatingPointType = void 0;
var location_model_1 = require("./location.model");
var floating_point_type_children_model_1 = require("./floating-point-type-children.model");
var FloatingPointType = /** @class */ (function () {
    function FloatingPointType() {
        this.name = '';
        this.children = new floating_point_type_children_model_1.FloatingPointTypeChildren();
        this.location = new location_model_1.Location();
    }
    return FloatingPointType;
}());
exports.FloatingPointType = FloatingPointType;
