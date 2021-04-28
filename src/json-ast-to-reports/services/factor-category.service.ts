import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { NodeFeature } from '../enums/node-feature.enum';

export class FactorCategoryService {

    getNodeFeature(syntaxKind: SyntaxKind): NodeFeature {
        switch (syntaxKind) {
            case SyntaxKind.ArrayType:
            case SyntaxKind.Identifier:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.UnionType:
                return NodeFeature.ATOMIC;
            case SyntaxKind.BinaryExpression:
                return NodeFeature.BINARY;
            case SyntaxKind.BarToken:
            case SyntaxKind.AmpersandToken:
            case SyntaxKind.LessThanLessThanToken:
            case SyntaxKind.GreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case SyntaxKind.CaretToken:
                return NodeFeature.BIT_DOOR;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
                return NodeFeature.CALL_DECLARATION;
            case SyntaxKind.CatchClause:
            case SyntaxKind.IfStatement:
            case SyntaxKind.SwitchStatement:
                return NodeFeature.CONDITIONAL;
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return NodeFeature.FUNC;
            case SyntaxKind.Keyword:
                return NodeFeature.KEYWORD;
            case SyntaxKind.Literal:
                return NodeFeature.LITERAL;
            case SyntaxKind.AmpersandAmpersandToken:
            case SyntaxKind.BarBarToken:
                return NodeFeature.LOGIC_DOOR;
            case SyntaxKind.DoStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WhileStatement:
                return NodeFeature.LOOP;
            case SyntaxKind.RegularExpressionLiteral:
                return NodeFeature.REGEX;
            case SyntaxKind.ConditionalExpression:
                return NodeFeature.TERNARY;
            case SyntaxKind.VariableStatement:
                return NodeFeature.VARIABLE;
            default:
                return NodeFeature.EMPTY;
        }
    }
}
