"use strict";
exports.__esModule = true;
exports.BasicForStatementChildren = void 0;
var infos_model_1 = require("./infos.model");
var statement_model_1 = require("./statement.model");
var expression_model_1 = require("./expression.model");
var for_init_model_1 = require("./for-init.model");
var for_update_model_1 = require("./for-update.model");
var BasicForStatementChildren = /** @class */ (function () {
    function BasicForStatementChildren() {
        this.For = [new infos_model_1.Infos()];
        this.LBrace = [new infos_model_1.Infos()];
        this.forInit = [new for_init_model_1.ForInit()];
        this.Semicolon = [new infos_model_1.Infos()];
        this.expression = [new expression_model_1.Expression()];
        this.forUpdate = [new for_update_model_1.ForUpdate()];
        this.RBrace = [new infos_model_1.Infos()];
        this.statement = [new statement_model_1.Statement()];
    }
    return BasicForStatementChildren;
}());
exports.BasicForStatementChildren = BasicForStatementChildren;
