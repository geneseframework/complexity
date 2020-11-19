"use strict";
exports.__esModule = true;
exports.SwitchCaseChildren = void 0;
var switch_label_model_1 = require("./switch-label.model");
var location_model_1 = require("./location.model");
var infos_model_1 = require("./infos.model");
var expression_model_1 = require("./expression.model");
var SwitchCaseChildren = /** @class */ (function () {
    function SwitchCaseChildren() {
        this.switchLabel = [new switch_label_model_1.SwitchLabel()];
        this.blockStatements = [{
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
                                                                    statementExpression: [{
                                                                            name: '',
                                                                            children: {
                                                                                expression: [new expression_model_1.Expression()]
                                                                            },
                                                                            location: new location_model_1.Location()
                                                                        }],
                                                                    Semicolon: [new infos_model_1.Infos()]
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
            }];
    }
    return SwitchCaseChildren;
}());
exports.SwitchCaseChildren = SwitchCaseChildren;
