"use strict";
exports.__esModule = true;
exports.StatementWithoutTrailingSubstatementChildren = void 0;
var switch_statement_model_1 = require("./switch-statement.model");
var expression_statement_model_1 = require("./expression-statement.model");
var return_statement_model_1 = require("./return-statement.model");
var infos_model_1 = require("./infos.model");
var statement_expression_model_1 = require("./statement-expression.model");
var location_model_1 = require("./location.model");
var do_statement_model_1 = require("./do-statement.model");
var try_statement_model_1 = require("./try-statement.model");
var throw_statement_model_1 = require("./throw-statement.model");
var assert_statement_model_1 = require("./assert-statement.model");
var StatementWithoutTrailingSubstatementChildren = /** @class */ (function () {
    function StatementWithoutTrailingSubstatementChildren() {
        this.switchStatement = [new switch_statement_model_1.SwitchStatement()];
        this.expressionStatement = [new expression_statement_model_1.ExpressionStatement()];
        this.returnStatement = [new return_statement_model_1.ReturnStatement()];
        this.doStatement = [new do_statement_model_1.DoStatement()];
        this.tryStatement = [new try_statement_model_1.TryStatement()];
        this.throwStatement = [new throw_statement_model_1.ThrowStatementElement()];
        this.assertStatement = [new assert_statement_model_1.AssertStatement()];
        this.block = [{
                name: '',
                children: {
                    LCurly: [new infos_model_1.Infos()],
                    blockStatements: [{
                            name: '',
                            children: {
                                blockStatement: [{
                                        name: '',
                                        children: {
                                            statement: [{
                                                    name: '',
                                                    children: {
                                                        statementWithoutTrailingSubstatement: [{
                                                                name: '',
                                                                children: {
                                                                    expressionStatement: [{
                                                                            name: '',
                                                                            children: {
                                                                                statementExpression: [new statement_expression_model_1.StatementExpression()]
                                                                            },
                                                                            location: new location_model_1.Location()
                                                                        }]
                                                                },
                                                                location: new location_model_1.Location()
                                                            }]
                                                    },
                                                    location: new location_model_1.Location()
                                                }]
                                        },
                                        location: new location_model_1.Location()
                                    }]
                            },
                            location: new location_model_1.Location()
                        }],
                    RCurly: [new infos_model_1.Infos()]
                },
                location: new location_model_1.Location()
            }];
    }
    return StatementWithoutTrailingSubstatementChildren;
}());
exports.StatementWithoutTrailingSubstatementChildren = StatementWithoutTrailingSubstatementChildren;
