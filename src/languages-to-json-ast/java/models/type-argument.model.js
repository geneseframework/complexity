"use strict";
exports.__esModule = true;
exports.TypeArgument = void 0;
var location_model_1 = require("./location.model");
var type_argument_children_model_1 = require("./type-argument-children.model");
var TypeArgument = /** @class */ (function () {
    function TypeArgument() {
        this.name = '';
        this.children = new type_argument_children_model_1.TypeArgumentChildren();
        this.location = new location_model_1.Location();
    }
    return TypeArgument;
}());
exports.TypeArgument = TypeArgument;
