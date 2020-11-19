"use strict";
exports.__esModule = true;
exports.SwitchLabel = void 0;
var location_model_1 = require("./location.model");
var switch_label_children_model_1 = require("./switch-label-children.model");
var SwitchLabel = /** @class */ (function () {
    function SwitchLabel() {
        this.name = '';
        this.children = new switch_label_children_model_1.SwitchLabelChildren();
        this.location = new location_model_1.Location();
    }
    return SwitchLabel;
}());
exports.SwitchLabel = SwitchLabel;
