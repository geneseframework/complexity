"use strict";
exports.__esModule = true;
exports.UnannTypeChildren = void 0;
var unann_reference_type_model_1 = require("./unann-reference-type.model");
var unann_primitive_type_model_1 = require("./unann-primitive-type.model");
var UnannTypeChildren = /** @class */ (function () {
    function UnannTypeChildren() {
        this.unannReferenceType = [new unann_reference_type_model_1.UnannReferenceType()];
        this.unannPrimitiveType = [new unann_primitive_type_model_1.UnannPrimitiveType()];
    }
    return UnannTypeChildren;
}());
exports.UnannTypeChildren = UnannTypeChildren;
