"use strict";
exports.__esModule = true;
exports.ForStatement = void 0;
var location_model_1 = require("./location.model");
var for_statement_children_model_1 = require("./for-statement-children.model");
var ForStatement = /** @class */ (function () {
    function ForStatement() {
        this.name = '';
        this.children = new for_statement_children_model_1.ForStatementChildren();
        this.location = new location_model_1.Location();
    }
    return ForStatement;
}());
exports.ForStatement = ForStatement;
