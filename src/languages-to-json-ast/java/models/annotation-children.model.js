"use strict";
exports.__esModule = true;
exports.AnnotationChildren = void 0;
var infos_model_1 = require("./infos.model");
var type_name_element_model_1 = require("./type-name-element.model");
var AnnotationChildren = /** @class */ (function () {
    function AnnotationChildren() {
        this.At = [new infos_model_1.Infos()];
        this.typeName = [new type_name_element_model_1.TypeNameElement()];
    }
    return AnnotationChildren;
}());
exports.AnnotationChildren = AnnotationChildren;
