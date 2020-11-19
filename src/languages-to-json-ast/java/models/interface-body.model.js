"use strict";
exports.__esModule = true;
exports.InterfaceBody = void 0;
var location_model_1 = require("./location.model");
var interface_body_children_model_1 = require("./interface-body-children.model");
var InterfaceBody = /** @class */ (function () {
    function InterfaceBody() {
        this.name = '';
        this.children = new interface_body_children_model_1.InterfaceBodyChildren();
        this.location = new location_model_1.Location();
    }
    return InterfaceBody;
}());
exports.InterfaceBody = InterfaceBody;
