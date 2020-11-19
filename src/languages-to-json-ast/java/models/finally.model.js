"use strict";
exports.__esModule = true;
exports.Finally = void 0;
var finally_children_model_1 = require("./finally-children.model");
var location_model_1 = require("./location.model");
var Finally = /** @class */ (function () {
    function Finally() {
        this.name = '';
        this.children = new finally_children_model_1.FinallyChildren();
        this.location = new location_model_1.Location();
    }
    return Finally;
}());
exports.Finally = Finally;
