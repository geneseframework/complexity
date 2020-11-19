"use strict";
exports.__esModule = true;
exports.ClassOrInterfaceTypeToInstanciate = void 0;
var class_or_interface_type_to_instantiate_children_model_1 = require("./class-or-interface-type-to-instantiate-children.model");
var location_model_1 = require("./location.model");
var ClassOrInterfaceTypeToInstanciate = /** @class */ (function () {
    function ClassOrInterfaceTypeToInstanciate() {
        this.name = '';
        this.classOrInterfaceTypeToInstantiate = [new class_or_interface_type_to_instantiate_children_model_1.ClassOrInterfaceTypeToInstanciateChildren()];
        this.location = new location_model_1.Location();
    }
    return ClassOrInterfaceTypeToInstanciate;
}());
exports.ClassOrInterfaceTypeToInstanciate = ClassOrInterfaceTypeToInstanciate;
