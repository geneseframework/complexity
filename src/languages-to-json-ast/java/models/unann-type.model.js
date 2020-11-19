"use strict";
exports.__esModule = true;
exports.UnannType = void 0;
var location_model_1 = require("./location.model");
var unann_type_children_model_1 = require("./unann-type-children.model");
var UnannType = /** @class */ (function () {
    function UnannType() {
        this.name = '';
        this.children = new unann_type_children_model_1.UnannTypeChildren();
        this.location = new location_model_1.Location();
    }
    return UnannType;
}());
exports.UnannType = UnannType;
