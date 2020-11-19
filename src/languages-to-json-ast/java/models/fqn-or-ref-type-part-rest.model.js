"use strict";
exports.__esModule = true;
exports.FqnOrRefTypePartRest = void 0;
var location_model_1 = require("./location.model");
var fqn_or_ref_type_part_rest_children_model_1 = require("./fqn-or-ref-type-part-rest-children.model");
var FqnOrRefTypePartRest = /** @class */ (function () {
    function FqnOrRefTypePartRest() {
        this.name = '';
        this.children = new fqn_or_ref_type_part_rest_children_model_1.FqnOrRefTypePartRestChildren();
        this.location = new location_model_1.Location();
    }
    return FqnOrRefTypePartRest;
}());
exports.FqnOrRefTypePartRest = FqnOrRefTypePartRest;
