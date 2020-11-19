"use strict";
exports.__esModule = true;
exports.DoStatement = void 0;
var location_model_1 = require("./location.model");
var do_statement_children_model_1 = require("./do-statement-children.model");
var DoStatement = /** @class */ (function () {
    function DoStatement() {
        this.name = '';
        this.children = new do_statement_children_model_1.DoStatementChildren();
        this.location = new location_model_1.Location();
    }
    return DoStatement;
}());
exports.DoStatement = DoStatement;
