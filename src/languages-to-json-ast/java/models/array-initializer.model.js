"use strict";
exports.__esModule = true;
exports.ArrayInitializer = void 0;
var location_model_1 = require("./location.model");
var array_initializer_children_model_1 = require("./array-initializer-children.model");
var ArrayInitializer = /** @class */ (function () {
    function ArrayInitializer() {
        this.name = '';
        this.children = new array_initializer_children_model_1.ArrayInitializerChildren();
        this.location = new location_model_1.Location();
    }
    return ArrayInitializer;
}());
exports.ArrayInitializer = ArrayInitializer;
