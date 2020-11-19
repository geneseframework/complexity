"use strict";
exports.__esModule = true;
exports.FqnOrRefTypeChildren = void 0;
var fqn_or_ref_type_part_first_model_1 = require("./fqn-or-ref-type-part-first.model");
var fqn_or_ref_type_part_rest_model_1 = require("./fqn-or-ref-type-part-rest.model");
var FqnOrRefTypeChildren = /** @class */ (function () {
    function FqnOrRefTypeChildren() {
        this.fqnOrRefTypePartFirst = [new fqn_or_ref_type_part_first_model_1.FqnOrRefTypePartFirst()];
        this.fqnOrRefTypePartRest = [new fqn_or_ref_type_part_rest_model_1.FqnOrRefTypePartRest()];
    }
    return FqnOrRefTypeChildren;
}());
exports.FqnOrRefTypeChildren = FqnOrRefTypeChildren;
