"use strict";
exports.__esModule = true;
exports.EnhancedForStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var local_variable_type_model_1 = require("./local-variable-type.model");
var variable_declarator_id_model_1 = require("./variable-declarator-id.model");
var expression_model_1 = require("./expression.model");
var statement_model_1 = require("./statement.model");
var EnhancedForStatementChildren = /** @class */ (function () {
    function EnhancedForStatementChildren() {
        this.For = [new infos_model_1.Infos()];
        this.LBrace = [new infos_model_1.Infos()];
        this.localVariableType = [new local_variable_type_model_1.LocalVariableType()];
        this.variableDeclaratorId = [new variable_declarator_id_model_1.VariableDeclaratorId()];
        this.Colon = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
        this.RBrace = [new infos_model_1.Infos()];
        this.statement = [new statement_model_1.Statement()];
    }
    return EnhancedForStatementChildren;
}());
exports.EnhancedForStatementChildren = EnhancedForStatementChildren;
