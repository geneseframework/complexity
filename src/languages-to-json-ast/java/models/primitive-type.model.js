"use strict";
exports.__esModule = true;
exports.PrimitiveType = void 0;
var location_model_1 = require("./location.model");
var primitive_type_children_model_1 = require("./primitive-type-children.model");
var PrimitiveType = /** @class */ (function () {
    function PrimitiveType() {
        this.name = '';
        this.children = new primitive_type_children_model_1.PrimitiveTypeChildren();
        this.location = new location_model_1.Location();
    }
    return PrimitiveType;
}());
exports.PrimitiveType = PrimitiveType;
