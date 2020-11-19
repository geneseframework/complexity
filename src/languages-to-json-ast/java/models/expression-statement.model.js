"use strict";
exports.__esModule = true;
exports.ExpressionStatement = void 0;
var location_model_1 = require("./location.model");
var expression_statement_children_model_1 = require("./expression-statement-children.model");
var ExpressionStatement = /** @class */ (function () {
    function ExpressionStatement() {
        this.name = '';
        this.children = new expression_statement_children_model_1.ExpressionStatementChildren();
        this.location = new location_model_1.Location();
    }
    return ExpressionStatement;
}());
exports.ExpressionStatement = ExpressionStatement;
