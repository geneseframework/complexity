"use strict";
exports.__esModule = true;
exports.TypeArguments = void 0;
var location_model_1 = require("./location.model");
var type_arguments_children_model_1 = require("./type-arguments-children.model");
var TypeArguments = /** @class */ (function () {
    function TypeArguments() {
        this.name = '';
        this.children = new type_arguments_children_model_1.TypeArgumentsChildren();
        this.location = new location_model_1.Location();
    }
    return TypeArguments;
}());
exports.TypeArguments = TypeArguments;
