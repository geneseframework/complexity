"use strict";
exports.__esModule = true;
exports.ClassOrInterfaceType = void 0;
var location_model_1 = require("./location.model");
var class_or_interface_type_children_model_1 = require("./class-or-interface-type-children.model");
var ClassOrInterfaceType = /** @class */ (function () {
    function ClassOrInterfaceType() {
        this.name = '';
        this.children = new class_or_interface_type_children_model_1.ClassOrInterfaceTypeChildren();
        this.location = new location_model_1.Location();
    }
    return ClassOrInterfaceType;
}());
exports.ClassOrInterfaceType = ClassOrInterfaceType;
