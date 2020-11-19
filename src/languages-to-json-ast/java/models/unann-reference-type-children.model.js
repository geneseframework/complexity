"use strict";
exports.__esModule = true;
exports.UnannReferenceTypeChildren = void 0;
var unann_class_or_interface_type_model_1 = require("./unann-class-or-interface-type.model");
var dims_model_1 = require("./dims.model");
var UnannReferenceTypeChildren = /** @class */ (function () {
    function UnannReferenceTypeChildren() {
        this.unannClassOrInterfaceType = [new unann_class_or_interface_type_model_1.UnannClassOrInterfaceType()];
        this.dims = [new dims_model_1.Dims()];
    }
    return UnannReferenceTypeChildren;
}());
exports.UnannReferenceTypeChildren = UnannReferenceTypeChildren;
