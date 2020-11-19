import { AstNode } from '../models/ast/ast-node.model';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';

/**
 * Service around complexity calculation
 */
export class CyclomaticCpxService {


    /**
     * Returns the cyclomatic complexity of an AST node, including its children
     * @param astNode
     */
    static calculateCyclomaticCpx(astNode: AstNode): number {
        let totalComplexity = CyclomaticCpxService.currentAstNodeCyclomaticCpx(astNode);
        totalComplexity += CyclomaticCpxService.childrenCyclomaticCpx(astNode);
        return totalComplexity;
    }


    /**
     * Returns the cyclomatic complexity of an AST node, without its children
     * @param astNode
     */
    private static currentAstNodeCyclomaticCpx(astNode: AstNode): number {
        return CyclomaticCpxService.increasesCyclomaticComplexity(astNode) ? 1 : 0;
    }


    /**
     * Returns the cyclomatic complexity of the children of an AST node
     * @param astNode
     */
    private static childrenCyclomaticCpx(astNode: AstNode): number {
        let cyclomaticCpx = 0;
        for (const childAstNode of astNode.children) {
            cyclomaticCpx += CyclomaticCpxService.currentAstNodeCyclomaticCpx(childAstNode);
            cyclomaticCpx += CyclomaticCpxService.childrenCyclomaticCpx(childAstNode)
        }
        return cyclomaticCpx;
    }


    /**
     * Increases the cyclomatic complexity when the AST node must increase it
     * @param astNode
     */
    static increasesCyclomaticComplexity(astNode: AstNode): boolean {
        switch (astNode.kind) {
            case SyntaxKind.AmpersandAmpersandToken:
            case SyntaxKind.BarBarToken:
            case SyntaxKind.CaseClause:
            case SyntaxKind.CatchClause:
            case SyntaxKind.DoStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.IfStatement:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.QuestionDotToken:
            case SyntaxKind.WhileStatement:
                return true;
            default:
                return false;
        }
    }
}
