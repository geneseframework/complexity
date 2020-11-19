"use strict";
exports.__esModule = true;
exports.BlockStatement = void 0;
var location_model_1 = require("./location.model");
var block_statement_children_model_1 = require("./block-statement-children.model");
var BlockStatement = /** @class */ (function () {
    function BlockStatement() {
        this.name = '';
        this.children = new block_statement_children_model_1.BlockStatementChildren();
        this.location = new location_model_1.Location();
    }
    return BlockStatement;
}());
exports.BlockStatement = BlockStatement;
