"use strict";
exports.__esModule = true;
exports.SwitchBlock = void 0;
var location_model_1 = require("./location.model");
var switch_block_children_model_1 = require("./switch-block-children.model");
var SwitchBlock = /** @class */ (function () {
    function SwitchBlock() {
        this.name = '';
        this.children = new switch_block_children_model_1.SwitchBlockChildren();
        this.location = new location_model_1.Location();
    }
    return SwitchBlock;
}());
exports.SwitchBlock = SwitchBlock;
