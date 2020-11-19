"use strict";
exports.__esModule = true;
exports.ConstructorModifier = void 0;
var constructor_modifier_children_model_1 = require("./constructor-modifier-children.model");
var location_model_1 = require("./location.model");
var ConstructorModifier = /** @class */ (function () {
    function ConstructorModifier() {
        this.name = '';
        this.children = new constructor_modifier_children_model_1.ConstructorModifierChildren();
        this.location = new location_model_1.Location();
    }
    return ConstructorModifier;
}());
exports.ConstructorModifier = ConstructorModifier;
