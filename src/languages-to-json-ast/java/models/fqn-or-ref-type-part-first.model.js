"use strict";
exports.__esModule = true;
exports.FqnOrRefTypePartFirst = void 0;
var location_model_1 = require("./location.model");
var fqn_or_ref_type_part_first_children_model_1 = require("./fqn-or-ref-type-part-first-children.model");
var FqnOrRefTypePartFirst = /** @class */ (function () {
    function FqnOrRefTypePartFirst() {
        this.name = '';
        this.children = new fqn_or_ref_type_part_first_children_model_1.FqnOrRefTypePartFirstChildren();
        this.location = new location_model_1.Location();
    }
    return FqnOrRefTypePartFirst;
}());
exports.FqnOrRefTypePartFirst = FqnOrRefTypePartFirst;
