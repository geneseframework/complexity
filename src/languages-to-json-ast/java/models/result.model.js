"use strict";
exports.__esModule = true;
exports.Result = void 0;
var location_model_1 = require("./location.model");
var result_children_model_1 = require("./result-children.model");
var Result = /** @class */ (function () {
    function Result() {
        this.name = '';
        this.children = new result_children_model_1.ResultChildren();
        this.location = new location_model_1.Location();
    }
    return Result;
}());
exports.Result = Result;
