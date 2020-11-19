"use strict";
exports.__esModule = true;
exports.ConstructorBody = void 0;
var constructor_body_children_model_1 = require("./constructor-body-children.model");
var location_model_1 = require("./location.model");
var ConstructorBody = /** @class */ (function () {
    function ConstructorBody() {
        this.name = '';
        this.children = new constructor_body_children_model_1.ConstructorBodyChildren();
        this.location = new location_model_1.Location();
    }
    return ConstructorBody;
}());
exports.ConstructorBody = ConstructorBody;
