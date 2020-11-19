"use strict";
exports.__esModule = true;
exports.FormalParameterList = void 0;
var location_model_1 = require("./location.model");
var formal_parameter_list_children_model_1 = require("./formal-parameter-list-children.model");
var FormalParameterList = /** @class */ (function () {
    function FormalParameterList() {
        this.name = '';
        this.children = new formal_parameter_list_children_model_1.FormalParameterListChildren();
        this.location = new location_model_1.Location();
    }
    return FormalParameterList;
}());
exports.FormalParameterList = FormalParameterList;
