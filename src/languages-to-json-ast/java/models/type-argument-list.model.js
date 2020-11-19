"use strict";
exports.__esModule = true;
exports.TypeArgumentList = void 0;
var location_model_1 = require("./location.model");
var type_argument_list_children_model_1 = require("./type-argument-list-children.model");
var TypeArgumentList = /** @class */ (function () {
    function TypeArgumentList() {
        this.name = '';
        this.children = new type_argument_list_children_model_1.TypeArgumentListChildren();
        this.location = new location_model_1.Location();
    }
    return TypeArgumentList;
}());
exports.TypeArgumentList = TypeArgumentList;
