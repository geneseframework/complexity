"use strict";
exports.__esModule = true;
exports.ArgumentList = void 0;
var location_model_1 = require("./location.model");
var argument_list_children_model_1 = require("./argument-list-children.model");
var ArgumentList = /** @class */ (function () {
    function ArgumentList() {
        this.name = '';
        this.children = new argument_list_children_model_1.ArgumentListChildren();
        this.location = new location_model_1.Location();
    }
    return ArgumentList;
}());
exports.ArgumentList = ArgumentList;
