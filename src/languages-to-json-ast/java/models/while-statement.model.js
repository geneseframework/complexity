"use strict";
exports.__esModule = true;
exports.WhileStatement = void 0;
var location_model_1 = require("./location.model");
var if_statement_children_model_1 = require("./if-statement-children.model");
var WhileStatement = /** @class */ (function () {
    function WhileStatement() {
        this.name = '';
        this.children = new if_statement_children_model_1.IfStatementChildren();
        this.location = new location_model_1.Location();
    }
    return WhileStatement;
}());
exports.WhileStatement = WhileStatement;
