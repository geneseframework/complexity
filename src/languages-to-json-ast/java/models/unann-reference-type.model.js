"use strict";
exports.__esModule = true;
exports.UnannReferenceType = void 0;
var location_model_1 = require("./location.model");
var unann_reference_type_children_model_1 = require("./unann-reference-type-children.model");
var UnannReferenceType = /** @class */ (function () {
    function UnannReferenceType() {
        this.name = '';
        this.children = new unann_reference_type_children_model_1.UnannReferenceTypeChildren();
        this.location = new location_model_1.Location();
    }
    return UnannReferenceType;
}());
exports.UnannReferenceType = UnannReferenceType;
