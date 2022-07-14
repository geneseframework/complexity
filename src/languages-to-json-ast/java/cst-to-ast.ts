import { SyntaxKind } from '../../core/enum/syntax-kind.enum';


/**
 * Convert a cst node to its corresponding ast node
 * @param cstNode
 * @param kind
 * @returns {any}
 */
export function cstToAst(cstNode, kind = undefined): any {

    const children = cstNode.children;

    try {
        return require(`./cstToAstCases/${toKebabCase(cstNode.name || kind)}`).run(cstNode, children);
    } catch (e) {
        const error = new Error(e.message + '!!!' + cstNode.location ? cstNode.location.startLine : cstNode.startLine)
        error.stack = e.stack;
        console.log('Error in cstToAst \n', cstNode);
    }
}

/**
 * Convert camelCase to kabab-case
 * @param text
 * @returns {string}
 */
function toKebabCase(text: string): string {
    if (text === undefined) return '';
    return text.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * The the SyntaxKind corresponding to the given operator
 * @param operator
 * @returns {SyntaxKind.EqualsToken | SyntaxKind.GreaterThanToken | SyntaxKind.PlusToken | SyntaxKind.EqualsEqualsToken | string | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.AsteriskToken | SyntaxKind.LessThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken | SyntaxKind.MinusToken}
 */
export function getBinaryOperatorName(operator: string): string {
    switch (operator) {
        case '>':
            return SyntaxKind.GreaterThanToken;
        case '>=':
            return SyntaxKind.GreaterThanEqualsToken;
        case '<':
            return SyntaxKind.LessThanToken;
        case '<=':
            return SyntaxKind.LessThanEqualsToken;
        case '+':
            return SyntaxKind.PlusToken;
        case '-':
            return SyntaxKind.MinusToken;
        case '*':
            return SyntaxKind.AsteriskToken;
        case '==':
            return SyntaxKind.EqualsEqualsToken;
        case '=':
            return SyntaxKind.EqualsToken;
        case '&&':
            return SyntaxKind.AmpersandAmpersandToken
        case '||':
            return SyntaxKind.BarBarToken
        case '!=':
            return SyntaxKind.ExclamationEqualsToken
        case '+=':
            return SyntaxKind.PlusEqualsToken
        case '-=':
            return SyntaxKind.MinusEqualsToken
        case '*=':
            return SyntaxKind.AsteriskEqualsToken
        case '/=':
            return SyntaxKind.SlashEqualsToken
        case '%=':
            return SyntaxKind.PercentEqualsToken
        case '&=':
            return SyntaxKind.AmpersandEqualsToken
        case '^=':
            return SyntaxKind.CaretEqualsToken
        case '|=':
            return SyntaxKind.BarEqualsToken
        case '<<=':
            return SyntaxKind.LessThanLessThanEqualsToken
        case '>>=':
            return SyntaxKind.GreaterThanGreaterThanEqualsToken
        case '>>>=':
            return SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
        case '?':
            return SyntaxKind.QuestionToken
        case ':':
            return SyntaxKind.ColonToken
        case '|':
            return SyntaxKind.BarToken
        case '^':
            return SyntaxKind.CaretToken
        case '&':
            return SyntaxKind.AmpersandToken
        case '<<':
            return SyntaxKind.LessThanLessThanToken
        case '>>':
            return SyntaxKind.GreaterThanGreaterThanToken
        case '>>>':
            return SyntaxKind.GreaterThanGreaterThanGreaterThanToken
        case '/':
            return SyntaxKind.SlashToken
        case '%':
            return SyntaxKind.PercentToken
        default:
            return operator;
    }
}
