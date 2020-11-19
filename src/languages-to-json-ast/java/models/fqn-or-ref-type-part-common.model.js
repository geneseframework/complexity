"use strict";
exports.__esModule = true;
exports.FqnOrRefTypePartCommon = void 0;
var location_model_1 = require("./location.model");
var fqn_or_ref_type_part_common_children_model_1 = require("./fqn-or-ref-type-part-common-children.model");
var FqnOrRefTypePartCommon = /** @class */ (function () {
    function FqnOrRefTypePartCommon() {
        this.name = '';
        this.children = new fqn_or_ref_type_part_common_children_model_1.FqnOrRefTypePartCommonChildren();
        this.location = new location_model_1.Location();
    }
    return FqnOrRefTypePartCommon;
}());
exports.FqnOrRefTypePartCommon = FqnOrRefTypePartCommon;
