"use strict";
exports.__esModule = true;
exports.CyclomaticCpxService = void 0;
var syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
/**
 * Service around complexity calculation
 */
var CyclomaticCpxService = /** @class */ (function () {
    function CyclomaticCpxService() {
    }
    /**
     * Returns the cyclomatic complexity of an AST node, including its children
     * @param astNode
     */
    CyclomaticCpxService.calculateCyclomaticCpx = function (astNode) {
        var totalComplexity = CyclomaticCpxService.currentAstNodeCyclomaticCpx(astNode);
        totalComplexity += CyclomaticCpxService.childrenCyclomaticCpx(astNode);
        return totalComplexity;
    };
    /**
     * Returns the cyclomatic complexity of an AST node, without its children
     * @param astNode
     */
    CyclomaticCpxService.currentAstNodeCyclomaticCpx = function (astNode) {
        return CyclomaticCpxService.increasesCyclomaticComplexity(astNode) ? 1 : 0;
    };
    /**
     * Returns the cyclomatic complexity of the children of an AST node
     * @param astNode
     */
    CyclomaticCpxService.childrenCyclomaticCpx = function (astNode) {
        var cyclomaticCpx = 0;
        for (var _i = 0, _a = astNode.children; _i < _a.length; _i++) {
            var childAstNode = _a[_i];
            cyclomaticCpx += CyclomaticCpxService.currentAstNodeCyclomaticCpx(childAstNode);
            cyclomaticCpx += CyclomaticCpxService.childrenCyclomaticCpx(childAstNode);
        }
        return cyclomaticCpx;
    };
    /**
     * Increases the cyclomatic complexity when the AST node must increase it
     * @param astNode
     */
    CyclomaticCpxService.increasesCyclomaticComplexity = function (astNode) {
        switch (astNode.kind) {
            case syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken:
            case syntax_kind_enum_1.SyntaxKind.BarBarToken:
            case syntax_kind_enum_1.SyntaxKind.CaseClause:
            case syntax_kind_enum_1.SyntaxKind.CatchClause:
            case syntax_kind_enum_1.SyntaxKind.DoStatement:
            case syntax_kind_enum_1.SyntaxKind.ForStatement:
            case syntax_kind_enum_1.SyntaxKind.ForInStatement:
            case syntax_kind_enum_1.SyntaxKind.ForOfStatement:
            case syntax_kind_enum_1.SyntaxKind.FunctionDeclaration:
            case syntax_kind_enum_1.SyntaxKind.IfStatement:
            case syntax_kind_enum_1.SyntaxKind.MethodDeclaration:
            case syntax_kind_enum_1.SyntaxKind.QuestionDotToken:
            case syntax_kind_enum_1.SyntaxKind.WhileStatement:
                return true;
            default:
                return false;
        }
    };
    return CyclomaticCpxService;
}());
exports.CyclomaticCpxService = CyclomaticCpxService;
