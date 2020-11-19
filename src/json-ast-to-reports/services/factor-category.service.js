"use strict";
exports.__esModule = true;
exports.FactorCategoryService = void 0;
var syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
var node_feature_enum_1 = require("../enums/node-feature.enum");
var FactorCategoryService = /** @class */ (function () {
    function FactorCategoryService() {
    }
    FactorCategoryService.prototype.getNodeFeature = function (syntaxKind) {
        switch (syntaxKind) {
            case syntax_kind_enum_1.SyntaxKind.ArrayType:
            case syntax_kind_enum_1.SyntaxKind.Identifier:
            case syntax_kind_enum_1.SyntaxKind.ThisKeyword:
            case syntax_kind_enum_1.SyntaxKind.UnionType:
                return node_feature_enum_1.NodeFeature.ATOMIC;
            case syntax_kind_enum_1.SyntaxKind.BinaryExpression:
                return node_feature_enum_1.NodeFeature.BINARY;
            case syntax_kind_enum_1.SyntaxKind.CatchClause:
            case syntax_kind_enum_1.SyntaxKind.IfStatement:
            case syntax_kind_enum_1.SyntaxKind.SwitchStatement:
                return node_feature_enum_1.NodeFeature.CONDITIONAL;
            case syntax_kind_enum_1.SyntaxKind.FunctionDeclaration:
            case syntax_kind_enum_1.SyntaxKind.MethodDeclaration:
                return node_feature_enum_1.NodeFeature.DECLARATION;
            case syntax_kind_enum_1.SyntaxKind.ArrowFunction:
            case syntax_kind_enum_1.SyntaxKind.FunctionExpression:
                return node_feature_enum_1.NodeFeature.FUNC;
            case syntax_kind_enum_1.SyntaxKind.Keyword:
                return node_feature_enum_1.NodeFeature.KEYWORD;
            case syntax_kind_enum_1.SyntaxKind.Literal:
                return node_feature_enum_1.NodeFeature.LITERAL;
            case syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken:
            case syntax_kind_enum_1.SyntaxKind.BarBarToken:
                return node_feature_enum_1.NodeFeature.LOGIC_DOOR;
            case syntax_kind_enum_1.SyntaxKind.BarToken:
            case syntax_kind_enum_1.SyntaxKind.AmpersandToken:
            case syntax_kind_enum_1.SyntaxKind.LessThanLessThanToken:
            case syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanToken:
            case syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case syntax_kind_enum_1.SyntaxKind.CaretToken:
                return node_feature_enum_1.NodeFeature.BIT_DOOR;
            case syntax_kind_enum_1.SyntaxKind.DoStatement:
            case syntax_kind_enum_1.SyntaxKind.ForStatement:
            case syntax_kind_enum_1.SyntaxKind.ForInStatement:
            case syntax_kind_enum_1.SyntaxKind.ForOfStatement:
            case syntax_kind_enum_1.SyntaxKind.WhileStatement:
                return node_feature_enum_1.NodeFeature.LOOP;
            case syntax_kind_enum_1.SyntaxKind.RegularExpressionLiteral:
                return node_feature_enum_1.NodeFeature.REGEX;
            case syntax_kind_enum_1.SyntaxKind.ConditionalExpression:
                return node_feature_enum_1.NodeFeature.TERNARY;
            default:
                return node_feature_enum_1.NodeFeature.EMPTY;
        }
    };
    return FactorCategoryService;
}());
exports.FactorCategoryService = FactorCategoryService;
