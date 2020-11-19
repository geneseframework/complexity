"use strict";
exports.__esModule = true;
exports.StatementWithoutTrailingSubstatement = void 0;
var location_model_1 = require("./location.model");
var statement_without_trailing_substatement_children_model_1 = require("./statement-without-trailing-substatement-children.model");
var StatementWithoutTrailingSubstatement = /** @class */ (function () {
    function StatementWithoutTrailingSubstatement() {
        this.name = '';
        this.children = new statement_without_trailing_substatement_children_model_1.StatementWithoutTrailingSubstatementChildren();
        this.location = new location_model_1.Location();
    }
    return StatementWithoutTrailingSubstatement;
}());
exports.StatementWithoutTrailingSubstatement = StatementWithoutTrailingSubstatement;
