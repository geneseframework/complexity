"use strict";
exports.__esModule = true;
exports.TypeNameElement = void 0;
var location_model_1 = require("./location.model");
var type_name_children_model_1 = require("./type-name-children.model");
var TypeNameElement = /** @class */ (function () {
    function TypeNameElement() {
        this.name = '';
        this.children = new type_name_children_model_1.TypeNameChildren();
        this.location = new location_model_1.Location();
    }
    return TypeNameElement;
}());
exports.TypeNameElement = TypeNameElement;
