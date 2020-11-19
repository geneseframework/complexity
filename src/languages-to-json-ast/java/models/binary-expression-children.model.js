"use strict";
exports.__esModule = true;
exports.BinaryExpressionChildren = void 0;
var location_model_1 = require("./location.model");
var infos_model_1 = require("./infos.model");
var unary_expression_model_1 = require("./unary-expression.model");
var BinaryExpressionChildren = /** @class */ (function () {
    function BinaryExpressionChildren() {
        this.unaryExpression = [new unary_expression_model_1.UnaryExpression()];
        this.BinaryOperator = [new infos_model_1.Infos()];
        this.AssignmentOperator = [new infos_model_1.Infos()];
        this.expression = [{
                name: '',
                children: {
                    ternaryExpression: [{
                            name: '',
                            children: {
                                binaryExpression: [{
                                        name: '',
                                        children: {
                                            unaryExpression: [new unary_expression_model_1.UnaryExpression()],
                                            BinaryOperator: [new infos_model_1.Infos()]
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
    return BinaryExpressionChildren;
}());
exports.BinaryExpressionChildren = BinaryExpressionChildren;
