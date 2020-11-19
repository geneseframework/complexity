"use strict";
exports.__esModule = true;
exports.Block = void 0;
var block_children_model_1 = require("./block-children.model");
var location_model_1 = require("./location.model");
var Block = /** @class */ (function () {
    function Block() {
        this.name = '';
        this.children = new block_children_model_1.BlockChildren();
        this.location = new location_model_1.Location();
    }
    return Block;
}());
exports.Block = Block;
