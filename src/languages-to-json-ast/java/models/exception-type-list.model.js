"use strict";
exports.__esModule = true;
exports.ExceptionTypeList = void 0;
var location_model_1 = require("./location.model");
var exception_type_list_children_model_1 = require("./exception-type-list-children.model");
var ExceptionTypeList = /** @class */ (function () {
    function ExceptionTypeList() {
        this.name = '';
        this.children = new exception_type_list_children_model_1.ExceptionTypeListChildren();
        this.location = new location_model_1.Location();
    }
    return ExceptionTypeList;
}());
exports.ExceptionTypeList = ExceptionTypeList;
