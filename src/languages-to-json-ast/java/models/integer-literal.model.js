"use strict";
exports.__esModule = true;
exports.IntegerLiteral = void 0;
var location_model_1 = require("./location.model");
var integer_literal_children_model_1 = require("./integer-literal-children.model");
var IntegerLiteral = /** @class */ (function () {
    function IntegerLiteral() {
        this.name = '';
        this.children = new integer_literal_children_model_1.IntegerLiteralChildren();
        this.location = new location_model_1.Location();
    }
    return IntegerLiteral;
}());
exports.IntegerLiteral = IntegerLiteral;
