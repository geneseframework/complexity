"use strict";
exports.__esModule = true;
exports.ClassBodyElement = void 0;
var location_model_1 = require("./location.model");
var class_body_children_model_1 = require("./class-body-children.model");
var ClassBodyElement = /** @class */ (function () {
    function ClassBodyElement() {
        this.name = '';
        this.children = new class_body_children_model_1.ClassBodyChildren();
        this.location = new location_model_1.Location();
    }
    return ClassBodyElement;
}());
exports.ClassBodyElement = ClassBodyElement;
