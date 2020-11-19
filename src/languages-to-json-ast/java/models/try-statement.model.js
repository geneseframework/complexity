"use strict";
exports.__esModule = true;
exports.TryStatement = void 0;
var location_model_1 = require("./location.model");
var try_statement_children_model_1 = require("./try-statement-children.model");
var TryStatement = /** @class */ (function () {
    function TryStatement() {
        this.name = '';
        this.children = new try_statement_children_model_1.TryStatementChildren();
        this.location = new location_model_1.Location();
    }
    return TryStatement;
}());
exports.TryStatement = TryStatement;
