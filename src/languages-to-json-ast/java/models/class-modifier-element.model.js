"use strict";
exports.__esModule = true;
exports.ClassModifierElement = void 0;
var class_modifier_children_model_1 = require("./class-modifier-children.model");
var location_model_1 = require("./location.model");
var ClassModifierElement = /** @class */ (function () {
    function ClassModifierElement() {
        this.name = '';
        this.children = new class_modifier_children_model_1.ClassModifierChildren();
        this.location = new location_model_1.Location();
    }
    return ClassModifierElement;
}());
exports.ClassModifierElement = ClassModifierElement;
