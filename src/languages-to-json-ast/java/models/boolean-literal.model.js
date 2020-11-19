"use strict";
exports.__esModule = true;
exports.BooleanLiteral = void 0;
var location_model_1 = require("./location.model");
var boolean_literal_children_model_1 = require("./boolean-literal-children.model");
var BooleanLiteral = /** @class */ (function () {
    function BooleanLiteral() {
        this.name = '';
        this.children = new boolean_literal_children_model_1.BooleanLiteralChildren();
        this.location = new location_model_1.Location();
    }
    return BooleanLiteral;
}());
exports.BooleanLiteral = BooleanLiteral;
