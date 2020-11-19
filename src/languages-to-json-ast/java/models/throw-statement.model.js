"use strict";
exports.__esModule = true;
exports.ThrowStatementElement = void 0;
var location_model_1 = require("./location.model");
var throw_statement_element_children_model_1 = require("./throw-statement-element-children.model");
var ThrowStatementElement = /** @class */ (function () {
    function ThrowStatementElement() {
        this.name = '';
        this.children = new throw_statement_element_children_model_1.ThrowStatementElementChildren();
        this.location = new location_model_1.Location();
    }
    return ThrowStatementElement;
}());
exports.ThrowStatementElement = ThrowStatementElement;
