"use strict";
exports.__esModule = true;
exports.LiteralChildren = void 0;
var integer_literal_model_1 = require("./integer-literal.model");
var boolean_literal_model_1 = require("./boolean-literal.model");
var infos_model_1 = require("./infos.model");
var LiteralChildren = /** @class */ (function () {
    function LiteralChildren() {
        this.integerLiteral = [new integer_literal_model_1.IntegerLiteral()];
        this.booleanLiteral = [new boolean_literal_model_1.BooleanLiteral()];
        this.StringLiteral = [new infos_model_1.Infos()];
        this.Null = [new infos_model_1.Infos()];
    }
    return LiteralChildren;
}());
exports.LiteralChildren = LiteralChildren;
