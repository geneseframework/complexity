"use strict";
exports.__esModule = true;
exports.LocalVariableType = void 0;
var location_model_1 = require("./location.model");
var local_variable_type_children_model_1 = require("./local-variable-type-children.model");
var LocalVariableType = /** @class */ (function () {
    function LocalVariableType() {
        this.name = '';
        this.children = new local_variable_type_children_model_1.LocalVariableTypeChildren();
        this.location = new location_model_1.Location();
    }
    return LocalVariableType;
}());
exports.LocalVariableType = LocalVariableType;
