"use strict";
exports.__esModule = true;
exports.MethodInvocationSuffixChildren = void 0;
var infos_model_1 = require("./infos.model");
var argument_list_model_1 = require("./argument-list.model");
var MethodInvocationSuffixChildren = /** @class */ (function () {
    function MethodInvocationSuffixChildren() {
        this.LBrace = [new infos_model_1.Infos()];
        this.argumentList = [new argument_list_model_1.ArgumentList()];
        this.RBrace = [new infos_model_1.Infos()];
    }
    return MethodInvocationSuffixChildren;
}());
exports.MethodInvocationSuffixChildren = MethodInvocationSuffixChildren;
