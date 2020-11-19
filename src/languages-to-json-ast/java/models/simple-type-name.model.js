"use strict";
exports.__esModule = true;
exports.SimpleTypeName = void 0;
var location_model_1 = require("./location.model");
var simple_type_name_children_model_1 = require("./simple-type-name-children.model");
var SimpleTypeName = /** @class */ (function () {
    function SimpleTypeName() {
        this.name = '';
        this.children = new simple_type_name_children_model_1.SimpleTypeNameChildren();
        this.location = new location_model_1.Location();
    }
    return SimpleTypeName;
}());
exports.SimpleTypeName = SimpleTypeName;
