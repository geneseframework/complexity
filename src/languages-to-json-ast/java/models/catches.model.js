"use strict";
exports.__esModule = true;
exports.Catches = void 0;
var catches_children_1 = require("./catches-children");
var location_model_1 = require("./location.model");
var Catches = /** @class */ (function () {
    function Catches() {
        this.name = '';
        this.children = new catches_children_1.CatchesChildren();
        this.location = new location_model_1.Location();
    }
    return Catches;
}());
exports.Catches = Catches;
