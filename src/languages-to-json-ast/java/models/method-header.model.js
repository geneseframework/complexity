"use strict";
exports.__esModule = true;
exports.MethodHeader = void 0;
var location_model_1 = require("./location.model");
var method_header_children_model_1 = require("./method-header-children.model");
var MethodHeader = /** @class */ (function () {
    function MethodHeader() {
        this.name = '';
        this.children = new method_header_children_model_1.MethodHeaderChildren();
        this.location = new location_model_1.Location();
    }
    return MethodHeader;
}());
exports.MethodHeader = MethodHeader;
