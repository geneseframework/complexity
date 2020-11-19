import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';

export const binaryOperatorsPrecedence = [
    [SyntaxKind.EqualsToken, SyntaxKind.PlusEqualsToken, SyntaxKind.MinusEqualsToken, SyntaxKind.AsteriskEqualsToken, SyntaxKind.SlashEqualsToken, SyntaxKind.PercentEqualsToken, SyntaxKind.AmpersandEqualsToken, SyntaxKind.CaretEqualsToken, SyntaxKind.BarEqualsToken, SyntaxKind.LessThanLessThanEqualsToken, SyntaxKind.GreaterThanGreaterThanEqualsToken, SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken],
    [SyntaxKind.QuestionToken, SyntaxKind.ColonToken],
    [SyntaxKind.BarBarToken],
    [SyntaxKind.AmpersandAmpersandToken],
    [SyntaxKind.BarToken],
    [SyntaxKind.CaretToken],
    [SyntaxKind.AmpersandToken],
    [SyntaxKind.EqualsEqualsToken, SyntaxKind.ExclamationEqualsToken],
    [SyntaxKind.LessThanToken, SyntaxKind.LessThanEqualsToken, SyntaxKind.GreaterThanToken, SyntaxKind.GreaterThanEqualsToken],
    [SyntaxKind.LessThanLessThanToken, SyntaxKind.GreaterThanGreaterThanToken, SyntaxKind.GreaterThanGreaterThanGreaterThanToken],
    [SyntaxKind.PlusToken, SyntaxKind.MinusToken],
    [SyntaxKind.AsteriskToken, SyntaxKind.SlashToken, SyntaxKind.PercentToken],
];
