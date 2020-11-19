"use strict";
exports.__esModule = true;
exports.ArrayCreationExplicitInitSuffix = void 0;
var location_model_1 = require("./location.model");
var array_creation_explicit_init_suffix_children_model_1 = require("./array-creation-explicit-init-suffix-children.model");
var ArrayCreationExplicitInitSuffix = /** @class */ (function () {
    function ArrayCreationExplicitInitSuffix() {
        this.name = '';
        this.children = new array_creation_explicit_init_suffix_children_model_1.ArrayCreationExplicitInitSuffixChildren();
        this.location = new location_model_1.Location();
    }
    return ArrayCreationExplicitInitSuffix;
}());
exports.ArrayCreationExplicitInitSuffix = ArrayCreationExplicitInitSuffix;
