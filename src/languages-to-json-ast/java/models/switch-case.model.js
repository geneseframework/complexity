"use strict";
exports.__esModule = true;
exports.SwitchCase = void 0;
var location_model_1 = require("./location.model");
var switch_case_children_model_1 = require("./switch-case-children.model");
var SwitchCase = /** @class */ (function () {
    function SwitchCase() {
        this.name = '';
        this.children = new switch_case_children_model_1.SwitchCaseChildren();
        this.location = new location_model_1.Location();
    }
    return SwitchCase;
}());
exports.SwitchCase = SwitchCase;
