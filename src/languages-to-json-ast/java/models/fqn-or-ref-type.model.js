"use strict";
exports.__esModule = true;
exports.FqnOrRefType = void 0;
var location_model_1 = require("./location.model");
var fqn_or_ref_type_children_model_1 = require("./fqn-or-ref-type-children.model");
var FqnOrRefType = /** @class */ (function () {
    function FqnOrRefType() {
        this.name = '';
        this.children = new fqn_or_ref_type_children_model_1.FqnOrRefTypeChildren();
        this.location = new location_model_1.Location();
    }
    return FqnOrRefType;
}());
exports.FqnOrRefType = FqnOrRefType;
