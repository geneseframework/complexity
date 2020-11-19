"use strict";
exports.__esModule = true;
exports.AnnotationElement = void 0;
var annotation_children_model_1 = require("./annotation-children.model");
var location_model_1 = require("./location.model");
var AnnotationElement = /** @class */ (function () {
    function AnnotationElement() {
        this.name = '';
        this.children = new annotation_children_model_1.AnnotationChildren();
        this.location = new location_model_1.Location();
    }
    return AnnotationElement;
}());
exports.AnnotationElement = AnnotationElement;
