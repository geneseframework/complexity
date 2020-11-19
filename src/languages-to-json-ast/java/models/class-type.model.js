"use strict";
exports.__esModule = true;
exports.ClassType = void 0;
var location_model_1 = require("./location.model");
var class_type_children_model_1 = require("./class-type-children.model");
var ClassType = /** @class */ (function () {
    function ClassType() {
        this.name = '';
        this.children = new class_type_children_model_1.ClassTypeChildren();
        this.location = new location_model_1.Location();
    }
    return ClassType;
}());
exports.ClassType = ClassType;
