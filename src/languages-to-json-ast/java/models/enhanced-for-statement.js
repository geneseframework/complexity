"use strict";
exports.__esModule = true;
exports.EnhancedForStatement = void 0;
var location_model_1 = require("./location.model");
var enhanced_for_statement_children_model_1 = require("./enhanced-for-statement-children.model");
var EnhancedForStatement = /** @class */ (function () {
    function EnhancedForStatement() {
        this.name = '';
        this.children = new enhanced_for_statement_children_model_1.EnhancedForStatementChildren();
        this.location = new location_model_1.Location();
    }
    return EnhancedForStatement;
}());
exports.EnhancedForStatement = EnhancedForStatement;
