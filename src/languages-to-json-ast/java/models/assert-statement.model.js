"use strict";
exports.__esModule = true;
exports.AssertStatement = void 0;
var location_model_1 = require("./location.model");
var assert_statement_children_model_1 = require("./assert-statement-children.model");
var AssertStatement = /** @class */ (function () {
    function AssertStatement() {
        this.name = '';
        this.children = new assert_statement_children_model_1.AssertStatementChildren();
        this.location = new location_model_1.Location();
    }
    return AssertStatement;
}());
exports.AssertStatement = AssertStatement;
