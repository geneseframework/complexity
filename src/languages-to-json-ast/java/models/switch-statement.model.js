"use strict";
exports.__esModule = true;
exports.SwitchStatement = void 0;
var location_model_1 = require("./location.model");
var switch_statement_children_model_1 = require("./switch-statement-children.model");
var SwitchStatement = /** @class */ (function () {
    function SwitchStatement() {
        this.name = '';
        this.children = new switch_statement_children_model_1.SwitchStatementChildren();
        this.location = new location_model_1.Location();
    }
    return SwitchStatement;
}());
exports.SwitchStatement = SwitchStatement;
