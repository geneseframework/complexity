"use strict";
exports.__esModule = true;
exports.TypeArgumentsOrDiamond = void 0;
var location_model_1 = require("./location.model");
var type_arguments_or_diamond_children_model_1 = require("./type-arguments-or-diamond-children.model");
var TypeArgumentsOrDiamond = /** @class */ (function () {
    function TypeArgumentsOrDiamond() {
        this.name = '';
        this.children = new type_arguments_or_diamond_children_model_1.TypeArgumentsOrDiamondChildren();
        this.location = new location_model_1.Location();
    }
    return TypeArgumentsOrDiamond;
}());
exports.TypeArgumentsOrDiamond = TypeArgumentsOrDiamond;
