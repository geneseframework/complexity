"use strict";
exports.__esModule = true;
exports.UnannClassType = void 0;
var location_model_1 = require("./location.model");
var unann_class_type_children_model_1 = require("./unann-class-type-children.model");
var UnannClassType = /** @class */ (function () {
    function UnannClassType() {
        this.name = '';
        this.children = new unann_class_type_children_model_1.UnannClassTypeChildren();
        this.location = new location_model_1.Location();
    }
    return UnannClassType;
}());
exports.UnannClassType = UnannClassType;
