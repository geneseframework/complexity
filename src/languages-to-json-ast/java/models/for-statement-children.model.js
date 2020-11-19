"use strict";
exports.__esModule = true;
exports.ForStatementChildren = void 0;
var basic_for_statement_model_1 = require("./basic-for-statement.model");
var enhanced_for_statement_1 = require("./enhanced-for-statement");
var ForStatementChildren = /** @class */ (function () {
    function ForStatementChildren() {
        this.basicForStatement = [new basic_for_statement_model_1.BasicForStatement()];
        this.enhancedForStatement = [new enhanced_for_statement_1.EnhancedForStatement()];
    }
    return ForStatementChildren;
}());
exports.ForStatementChildren = ForStatementChildren;
