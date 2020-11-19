"use strict";
exports.__esModule = true;
exports.ReferenceType = void 0;
var location_model_1 = require("./location.model");
var reference_type_children_model_1 = require("./reference-type-children.model");
var ReferenceType = /** @class */ (function () {
    function ReferenceType() {
        this.name = '';
        this.children = new reference_type_children_model_1.ReferenceTypeChildren();
        this.location = new location_model_1.Location();
    }
    return ReferenceType;
}());
exports.ReferenceType = ReferenceType;
