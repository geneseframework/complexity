import { AstNode } from '../../models/ast/ast-node.model';
import { AstMayDefineContext } from '../../enums/ast-may-define-context.enum';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { flat } from '../../../core/utils/arrays.util';

/**
 * Service for operations on TreeNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
export class Ast {



    /**
     * Checks if an AstNode may define context
     * @param astNode
     */
    static mayDefineContext(astNode: AstNode): boolean {
        return Object.values(AstMayDefineContext).includes(astNode.kind as unknown as string);
    }


    // ------------------------------------------------------------------------------------------------
    // -------------------------------------   TYPE CHECKS   ------------------------------------------
    // ------------------------------------------------------------------------------------------------


    /**
     * Checks if an AST node is an index of an array, ie if it's a Node which is the second son of an ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isArrayIndex(astNode: AstNode): boolean {
        return(astNode?.parent?.kind === SyntaxKind.ElementAccessExpression && astNode?.parent.secondSon === astNode);
    }


    /**
     * Checks if an AST node is an array of array, ie if it's an ELEMENT_ACCESS_EXPRESSION which is the first son of another ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isArrayOfArray(astNode: AstNode): boolean {
        return(astNode?.parent?.kind === SyntaxKind.ElementAccessExpression && astNode?.kind === SyntaxKind.ElementAccessExpression && astNode?.pos === astNode.parent?.pos);
    }


    /**
     * Checks if an AST node is a BinaryExpression
     * @param astNode // The AST node
     */
    static isBinary(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.BinaryExpression ?? false;
    }

    /**
     * Checks if an AST node is a Block which is a "else"
     * @param astNode   // The node to check
     */
    static isBlock(astNode: AstNode): boolean {
        return (astNode?.kind === SyntaxKind.Block);
    }

    /**
     * Checks if an AST node is a CallExpression
     * @param astNode   // The AST node to check
     */
    static isCallExpression(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.CallExpression ?? false;
    }

    /**
     * Checks if an AST node is a CallExpression
     * @param astNode   // The AST node to check
     */
    static isClassDeclaration(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.ClassDeclaration ?? false;
    }

    /**
     * Checks if an AST node is an ExpressionStatement
     * @param astNode   // The AST node to check
     */
    static isExpressionStatement(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.ExpressionStatement ?? false;
    }

    /**
     * Checks if an AST node is a VariableStatement
     * @param astNode   // The AST node to check
     */
    static isVarStatement(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.VariableStatement ?? false;
    }

    /**
     * Returns true when the AST node is a logic door succeeding to a different logic door
     * a && b && c => returns false
     * a && b || c => returns true
     * (a && b) || c => returns false because of the brackets
     * @param astNode      // The node to analyse
     */
    static isDifferentLogicDoor(astNode: AstNode): boolean {
        if (Ast.isBinary(astNode) && Ast.isLogicDoor(astNode.secondSon)) {
            if (Ast.isBinary(astNode.parent)
                && !Ast.isSameOperatorToken(astNode, astNode.parent)
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if an AST node is a IfStatement which is an "else if"
     * @param astNode      // The node to analyse
     */
    static isElseIfStatement(astNode: AstNode): boolean {
        return (astNode?.kind === SyntaxKind.IfStatement && astNode?.parent?.kind === SyntaxKind.IfStatement);
    }

    /**
     * Checks if an AST node is a Block which is a "else"
     * @param astNode      // The node to analyse
     */
    static isElseStatement(astNode: AstNode): boolean {
        return (Ast.isBlock(astNode)
            && astNode?.parent?.kind === SyntaxKind.IfStatement
            && astNode?.parent.getSon(2) === astNode)
    }

    /**
     * Checks if an AST node is a function
     * @param astNode
     */
    static isFunctionDeclaration(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.FunctionDeclaration;
    }

    /**
     * Checks if an AST node is a function or a method
     * @param astNode
     */
    static isFunctionOrMethod(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.MethodDeclaration ||
            astNode?.kind === SyntaxKind.FunctionDeclaration ||
            astNode?.kind === SyntaxKind.Constructor ||
            false;
    }

    /**
     * Checks if an AST node is a function or a method
     * @param astNode
     */
    static isIdentifier(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.Identifier;
    }

    /**
     * Checks if an AST node is a logic door (ie : || or &&)
     * @param astNode // The AST node to check
     */
    static isLogicDoor(astNode: AstNode): boolean {
        return (astNode.kind === SyntaxKind.AmpersandAmpersandToken
            || astNode.kind === SyntaxKind.BarBarToken)
            ?? false;
    }

    /**
     * Checks if an AST node is an index of an array, ie if it's a Node which is the second son of an ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isCallIdentifier(astNode: AstNode): boolean {
        return(Ast.isCallExpression(astNode.parent) && Ast.isIdentifier(astNode));
    }

    /**
     * Checks if an AST node is an index of an array, ie if it's a Node which is the second son of an ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isEndOfFileToken(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.EndOfFileToken ?? false;
    }

    /**
     * Checks if an AST node is a Parameter
     * @param astNode // The AST node
     */
    static isParam(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.Parameter ?? false;
    }

    /**
     * Checks if an AST node is a PropertyAccessExpression
     * @param astNode // The AST node
     */
    static isPropertyAccessExpression(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.PropertyAccessExpression ?? false;
    }

    /**
     * Checks if two AST nodes have the same type
     * @param firstNode   // The first AST node
     * @param secondNode  // The second AST node
     */
    static isSameOperatorToken(firstNode: AstNode, secondNode: AstNode): boolean {
        return firstNode?.secondSon?.kind === secondNode?.secondSon?.kind ?? false;
    }

    /**
     * Checks if an AST node is a PropertyAccessExpression
     * @param astNode // The AST node
     */
    static isSourceFile(astNode: AstNode): boolean {
        return astNode?.kind === SyntaxKind.SourceFile ?? false;
    }

    // TODO: Remove duplicated code with ast.util.ts
    static getFirstChildOfKind(astNode: AstNode, kind: SyntaxKind): AstNode {
        return astNode.children.find(c => c.kind === kind);
    }

    // TODO: Remove duplicated code with ast.util.ts
    static getFirstDescendantOfKind(astNode: AstNode, kind: SyntaxKind): AstNode {
        if (!astNode.children) {
            return undefined;
        }
        const child: AstNode = this.getFirstChildOfKind(astNode, kind);
        return child ?? this.getFirstDescendantOfAstNodeArrayOfKind(astNode.children, kind);

    }

    // TODO: Remove duplicated code with ast.util.ts
    private static getFirstDescendantOfAstNodeArrayOfKind(astNodes: AstNode[], kind: SyntaxKind): AstNode {
        if (!astNodes || astNodes.length === 0) {
            return undefined;
        }
        for (const astNode of astNodes) {
            if (astNode.kind === kind) {
                return astNode;
            }
        }
        return this.getFirstDescendantOfAstNodeArrayOfKind(flat(astNodes.map(a => a.children)), kind);
    }

}
