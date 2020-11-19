"use strict";
exports.__esModule = true;
exports.ThrowsChildren = void 0;
var exception_type_list_model_1 = require("./exception-type-list.model");
var infos_model_1 = require("./infos.model");
var ThrowsChildren = /** @class */ (function () {
    function ThrowsChildren() {
        this.Throws = [new infos_model_1.Infos()];
        this.exceptionTypeList = [new exception_type_list_model_1.ExceptionTypeList()];
    }
    return ThrowsChildren;
}());
exports.ThrowsChildren = ThrowsChildren;
