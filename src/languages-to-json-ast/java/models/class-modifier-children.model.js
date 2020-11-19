"use strict";
exports.__esModule = true;
exports.ClassModifierChildren = void 0;
var annotation_element_model_1 = require("./annotation-element.model");
var infos_model_1 = require("./infos.model");
var ClassModifierChildren = /** @class */ (function () {
    function ClassModifierChildren() {
        this.annotation = [new annotation_element_model_1.AnnotationElement()];
        this.Public = [new infos_model_1.Infos()];
    }
    return ClassModifierChildren;
}());
exports.ClassModifierChildren = ClassModifierChildren;
