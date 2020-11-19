"use strict";
exports.__esModule = true;
exports.Statement = void 0;
var location_model_1 = require("./location.model");
var statement_children_model_1 = require("./statement-children.model");
var Statement = /** @class */ (function () {
    function Statement() {
        this.name = '';
        this.children = new statement_children_model_1.StatementChildren();
        this.location = new location_model_1.Location();
    }
    return Statement;
}());
exports.Statement = Statement;
