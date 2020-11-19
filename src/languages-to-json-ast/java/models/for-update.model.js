"use strict";
exports.__esModule = true;
exports.ForUpdate = void 0;
var location_model_1 = require("./location.model");
var for_update_children_model_1 = require("./for-update-children.model");
var ForUpdate = /** @class */ (function () {
    function ForUpdate() {
        this.name = '';
        this.children = new for_update_children_model_1.ForUpdateChildren();
        this.location = new location_model_1.Location();
    }
    return ForUpdate;
}());
exports.ForUpdate = ForUpdate;
