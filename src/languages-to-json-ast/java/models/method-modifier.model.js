"use strict";
exports.__esModule = true;
exports.MethodModifier = void 0;
var location_model_1 = require("./location.model");
var method_modifier_children_model_1 = require("./method-modifier-children.model");
var MethodModifier = /** @class */ (function () {
    function MethodModifier() {
        this.name = '';
        this.children = new method_modifier_children_model_1.MethodModifierChildren();
        this.location = new location_model_1.Location();
    }
    return MethodModifier;
}());
exports.MethodModifier = MethodModifier;
