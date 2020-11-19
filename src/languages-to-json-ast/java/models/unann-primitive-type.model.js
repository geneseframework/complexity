"use strict";
exports.__esModule = true;
exports.UnannPrimitiveType = void 0;
var location_model_1 = require("./location.model");
var unann_primitive_type_children_model_1 = require("./unann-primitive-type-children.model");
var UnannPrimitiveType = /** @class */ (function () {
    function UnannPrimitiveType() {
        this.name = '';
        this.children = new unann_primitive_type_children_model_1.UnannPrimitiveTypeChildren();
        this.location = new location_model_1.Location();
    }
    return UnannPrimitiveType;
}());
exports.UnannPrimitiveType = UnannPrimitiveType;
