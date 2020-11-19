"use strict";
exports.__esModule = true;
exports.CatchClause = void 0;
var catch_clause_children_model_1 = require("./catch-clause-children.model");
var location_model_1 = require("./location.model");
var CatchClause = /** @class */ (function () {
    function CatchClause() {
        this.name = '';
        this.children = new catch_clause_children_model_1.CatchClauseChildren();
        this.location = new location_model_1.Location();
    }
    return CatchClause;
}());
exports.CatchClause = CatchClause;
