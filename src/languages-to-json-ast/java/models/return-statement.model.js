"use strict";
exports.__esModule = true;
exports.ReturnStatement = void 0;
var location_model_1 = require("./location.model");
var return_statement_children_model_1 = require("./return-statement-children.model");
var ReturnStatement = /** @class */ (function () {
    function ReturnStatement() {
        this.name = '';
        this.children = new return_statement_children_model_1.ReturnStatementChildren();
        this.location = new location_model_1.Location();
    }
    return ReturnStatement;
}());
exports.ReturnStatement = ReturnStatement;
