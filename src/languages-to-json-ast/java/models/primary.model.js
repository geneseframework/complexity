"use strict";
exports.__esModule = true;
exports.Primary = void 0;
var location_model_1 = require("./location.model");
var primary_children_model_1 = require("./primary-children.model");
var Primary = /** @class */ (function () {
    function Primary() {
        this.name = '';
        this.children = new primary_children_model_1.PrimaryChildren();
        this.location = new location_model_1.Location();
    }
    return Primary;
}());
exports.Primary = Primary;
