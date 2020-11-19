"use strict";
exports.__esModule = true;
exports.getBinaryOperatorName = exports.cstToAst = void 0;
var syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
/**
 * Convert a cst node to its corresponding ast node
 * @param cstNode
 * @param kind
 * @returns {any}
 */
function cstToAst(cstNode, kind) {
    if (kind === void 0) { kind = undefined; }
    var children = cstNode.children;
    try {
        return require("./cstToAstCases/" + toKebabCase(cstNode.name || kind)).run(cstNode, children);
    }
    catch (e) {
        var error = new Error(e.message + '!!!' + cstNode.location ? cstNode.location.startLine : cstNode.startLine);
        error.stack = e.stack;
        throw error;
    }
}
exports.cstToAst = cstToAst;
/**
 * Convert camelCase to kabab-case
 * @param text
 * @returns {string}
 */
function toKebabCase(text) {
    if (text === undefined)
        return '';
    return text.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * The the SyntaxKind corresponding to the given operator
 * @param operator
 * @returns {SyntaxKind.EqualsToken | SyntaxKind.GreaterThanToken | SyntaxKind.PlusToken | SyntaxKind.EqualsEqualsToken | string | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.AsteriskToken | SyntaxKind.LessThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken | SyntaxKind.MinusToken}
 */
function getBinaryOperatorName(operator) {
    switch (operator) {
        case '>':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanToken;
        case '>=':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanEqualsToken;
        case '<':
            return syntax_kind_enum_1.SyntaxKind.LessThanToken;
        case '<=':
            return syntax_kind_enum_1.SyntaxKind.LessThanEqualsToken;
        case '+':
            return syntax_kind_enum_1.SyntaxKind.PlusToken;
        case '-':
            return syntax_kind_enum_1.SyntaxKind.MinusToken;
        case '*':
            return syntax_kind_enum_1.SyntaxKind.AsteriskToken;
        case '==':
            return syntax_kind_enum_1.SyntaxKind.EqualsEqualsToken;
        case '=':
            return syntax_kind_enum_1.SyntaxKind.EqualsToken;
        case '&&':
            return syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken;
        case '||':
            return syntax_kind_enum_1.SyntaxKind.BarBarToken;
        case '!=':
            return syntax_kind_enum_1.SyntaxKind.ExclamationEqualsToken;
        case '+=':
            return syntax_kind_enum_1.SyntaxKind.PlusEqualsToken;
        case '-=':
            return syntax_kind_enum_1.SyntaxKind.MinusEqualsToken;
        case '*=':
            return syntax_kind_enum_1.SyntaxKind.AsteriskEqualsToken;
        case '/=':
            return syntax_kind_enum_1.SyntaxKind.SlashEqualsToken;
        case '%=':
            return syntax_kind_enum_1.SyntaxKind.PercentEqualsToken;
        case '&=':
            return syntax_kind_enum_1.SyntaxKind.AmpersandEqualsToken;
        case '^=':
            return syntax_kind_enum_1.SyntaxKind.CaretEqualsToken;
        case '|=':
            return syntax_kind_enum_1.SyntaxKind.BarEqualsToken;
        case '<<=':
            return syntax_kind_enum_1.SyntaxKind.LessThanLessThanEqualsToken;
        case '>>=':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanEqualsToken;
        case '>>>=':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken;
        case '?':
            return syntax_kind_enum_1.SyntaxKind.QuestionToken;
        case ':':
            return syntax_kind_enum_1.SyntaxKind.ColonToken;
        case '|':
            return syntax_kind_enum_1.SyntaxKind.BarToken;
        case '^':
            return syntax_kind_enum_1.SyntaxKind.CaretToken;
        case '&':
            return syntax_kind_enum_1.SyntaxKind.AmpersandToken;
        case '<<':
            return syntax_kind_enum_1.SyntaxKind.LessThanLessThanToken;
        case '>>':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanToken;
        case '>>>':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
        case '/':
            return syntax_kind_enum_1.SyntaxKind.SlashToken;
        case '%':
            return syntax_kind_enum_1.SyntaxKind.PercentToken;
        default:
            return operator;
    }
}
exports.getBinaryOperatorName = getBinaryOperatorName;
