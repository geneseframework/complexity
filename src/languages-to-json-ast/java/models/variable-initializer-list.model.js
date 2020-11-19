"use strict";
exports.__esModule = true;
exports.VariableInitializerList = void 0;
var location_model_1 = require("./location.model");
var variable_initializer_children_model_1 = require("./variable-initializer-children.model");
var VariableInitializerList = /** @class */ (function () {
    function VariableInitializerList() {
        this.name = '';
        this.children = new variable_initializer_children_model_1.VariableInitializerChildren();
        this.location = new location_model_1.Location();
    }
    return VariableInitializerList;
}());
exports.VariableInitializerList = VariableInitializerList;
