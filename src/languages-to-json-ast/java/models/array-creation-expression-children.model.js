"use strict";
exports.__esModule = true;
exports.ArrayCreationExpressionChildren = void 0;
var infos_model_1 = require("./infos.model");
var primitive_type_model_1 = require("./primitive-type.model");
var array_creation_explicit_init_suffix_model_1 = require("./array-creation-explicit-init-suffix.model");
var ArrayCreationExpressionChildren = /** @class */ (function () {
    function ArrayCreationExpressionChildren() {
        this.New = [new infos_model_1.Infos()];
        this.primitiveType = [new primitive_type_model_1.PrimitiveType()];
        this.arrayCreationExplicitInitSuffix = [new array_creation_explicit_init_suffix_model_1.ArrayCreationExplicitInitSuffix()];
    }
    return ArrayCreationExpressionChildren;
}());
exports.ArrayCreationExpressionChildren = ArrayCreationExpressionChildren;
