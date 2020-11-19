"use strict";
exports.__esModule = true;
exports.PrimarySuffix = void 0;
var location_model_1 = require("./location.model");
var primary_suffix_children_model_1 = require("./primary-suffix-children.model");
var PrimarySuffix = /** @class */ (function () {
    function PrimarySuffix() {
        this.name = '';
        this.children = new primary_suffix_children_model_1.PrimarySuffixChildren();
        this.location = new location_model_1.Location();
    }
    return PrimarySuffix;
}());
exports.PrimarySuffix = PrimarySuffix;
