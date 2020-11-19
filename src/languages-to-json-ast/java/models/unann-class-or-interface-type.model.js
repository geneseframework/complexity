"use strict";
exports.__esModule = true;
exports.UnannClassOrInterfaceType = void 0;
var location_model_1 = require("./location.model");
var unann_class_or_interface_type_children_model_1 = require("./unann-class-or-interface-type-children.model");
var UnannClassOrInterfaceType = /** @class */ (function () {
    function UnannClassOrInterfaceType() {
        this.name = '';
        this.children = new unann_class_or_interface_type_children_model_1.UnannClassOrInterfaceTypeChildren();
        this.location = new location_model_1.Location();
    }
    return UnannClassOrInterfaceType;
}());
exports.UnannClassOrInterfaceType = UnannClassOrInterfaceType;
