"use strict";
exports.__esModule = true;
exports.Throws = void 0;
var throws_children_model_1 = require("./throws-children.model");
var location_model_1 = require("./location.model");
var Throws = /** @class */ (function () {
    function Throws() {
        this.name = '';
        this.children = new throws_children_model_1.ThrowsChildren();
        this.location = new location_model_1.Location();
    }
    return Throws;
}());
exports.Throws = Throws;
