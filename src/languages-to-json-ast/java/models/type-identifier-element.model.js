"use strict";
exports.__esModule = true;
exports.TypeIdentifierElement = void 0;
var location_model_1 = require("./location.model");
var type_identifier_children_model_1 = require("./type-identifier-children.model");
var TypeIdentifierElement = /** @class */ (function () {
    function TypeIdentifierElement() {
        this.name = '';
        this.children = new type_identifier_children_model_1.TypeIdentifierChildren();
        this.location = new location_model_1.Location();
    }
    return TypeIdentifierElement;
}());
exports.TypeIdentifierElement = TypeIdentifierElement;
