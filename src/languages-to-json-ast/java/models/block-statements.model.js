"use strict";
exports.__esModule = true;
exports.BlockStatements = void 0;
var location_model_1 = require("./location.model");
var block_statements_children_model_1 = require("./block-statements-children.model");
var BlockStatements = /** @class */ (function () {
    function BlockStatements() {
        this.name = '';
        this.children = new block_statements_children_model_1.BlockStatementsChildren();
        this.location = new location_model_1.Location();
    }
    return BlockStatements;
}());
exports.BlockStatements = BlockStatements;
