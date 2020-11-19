"use strict";
exports.__esModule = true;
exports.BasicForStatement = void 0;
var location_model_1 = require("./location.model");
var basic_for_statement_children_model_1 = require("./basic-for-statement-children.model");
var BasicForStatement = /** @class */ (function () {
    function BasicForStatement() {
        this.name = '';
        this.children = new basic_for_statement_children_model_1.BasicForStatementChildren();
        this.location = new location_model_1.Location();
    }
    return BasicForStatement;
}());
exports.BasicForStatement = BasicForStatement;
