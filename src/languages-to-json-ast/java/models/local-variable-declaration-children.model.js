"use strict";
exports.__esModule = true;
exports.LocalVariableDeclarationChildren = void 0;
var local_variable_type_model_1 = require("./local-variable-type.model");
var variable_declarator_list_model_1 = require("./variable-declarator-list.model");
var LocalVariableDeclarationChildren = /** @class */ (function () {
    function LocalVariableDeclarationChildren() {
        this.localVariableType = [new local_variable_type_model_1.LocalVariableType()];
        this.variableDeclaratorList = [new variable_declarator_list_model_1.VariableDeclaratorList()];
    }
    return LocalVariableDeclarationChildren;
}());
exports.LocalVariableDeclarationChildren = LocalVariableDeclarationChildren;
