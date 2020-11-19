"use strict";
exports.__esModule = true;
exports.VariableDeclaratorId = void 0;
var location_model_1 = require("./location.model");
var variable_declarator_id_children_model_1 = require("./variable-declarator-id-children.model");
var VariableDeclaratorId = /** @class */ (function () {
    function VariableDeclaratorId() {
        this.name = '';
        this.children = new variable_declarator_id_children_model_1.VariableDeclaratorIdChildren();
        this.location = new location_model_1.Location();
    }
    return VariableDeclaratorId;
}());
exports.VariableDeclaratorId = VariableDeclaratorId;
