"use strict";
exports.__esModule = true;
exports.VariableDeclaratorList = void 0;
var location_model_1 = require("./location.model");
var variable_declarator_list_children_model_1 = require("./variable-declarator-list-children.model");
var VariableDeclaratorList = /** @class */ (function () {
    function VariableDeclaratorList() {
        this.name = '';
        this.children = new variable_declarator_list_children_model_1.VariableDeclaratorListChildren();
        this.location = new location_model_1.Location();
    }
    return VariableDeclaratorList;
}());
exports.VariableDeclaratorList = VariableDeclaratorList;
