"use strict";
exports.__esModule = true;
exports.UnqualifiedClassInstanceCreationExpressionChildren = void 0;
var infos_model_1 = require("./infos.model");
var argument_list_model_1 = require("./argument-list.model");
var class_or_interface_type_to_instantiate_model_1 = require("./class-or-interface-type-to-instantiate.model");
var class_body_element_model_1 = require("./class-body-element.model");
var UnqualifiedClassInstanceCreationExpressionChildren = /** @class */ (function () {
    function UnqualifiedClassInstanceCreationExpressionChildren() {
        this.New = [new infos_model_1.Infos()];
        this.classOrInterfaceTypeToInstantiate = [new class_or_interface_type_to_instantiate_model_1.ClassOrInterfaceTypeToInstanciate()];
        this.LBrace = [new infos_model_1.Infos()];
        this.argumentList = [new argument_list_model_1.ArgumentList()];
        this.RBrace = [new infos_model_1.Infos()];
        this.classBody = [new class_body_element_model_1.ClassBodyElement()];
    }
    return UnqualifiedClassInstanceCreationExpressionChildren;
}());
exports.UnqualifiedClassInstanceCreationExpressionChildren = UnqualifiedClassInstanceCreationExpressionChildren;
