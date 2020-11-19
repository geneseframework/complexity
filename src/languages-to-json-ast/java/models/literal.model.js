"use strict";
exports.__esModule = true;
exports.Literal = void 0;
var location_model_1 = require("./location.model");
var literal_children_model_1 = require("./literal.children.model");
var Literal = /** @class */ (function () {
    function Literal() {
        this.name = '';
        this.children = new literal_children_model_1.LiteralChildren();
        this.location = new location_model_1.Location();
    }
    return Literal;
}());
exports.Literal = Literal;
