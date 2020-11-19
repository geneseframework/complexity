"use strict";
exports.__esModule = true;
exports.ForInit = void 0;
var location_model_1 = require("./location.model");
var for_init_children_model_1 = require("./for-init-children.model");
var ForInit = /** @class */ (function () {
    function ForInit() {
        this.name = '';
        this.children = new for_init_children_model_1.ForInitChildren();
        this.location = new location_model_1.Location();
    }
    return ForInit;
}());
exports.ForInit = ForInit;
