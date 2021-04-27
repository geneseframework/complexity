import { KindAliases } from '../../globals.const';
import { Node, SyntaxKind, VariableDeclaration, VariableStatement } from 'ts-morph';

/**
 * Service for operations on Node elements (ts-morph nodes)
 */
export class Ts {


    /**
     * Returns the SyntaxKind of an AST node or its alias if exists
     * @param node
     */
    static getKindAlias(node: Node): string {
        let kind = node.getKindName();
        for (const alias of KindAliases) {
            if (alias.aliases.includes(kind)) {
                kind = alias.name;
                break;
            }
        }
        return kind;
    }


    /**
     * Gets the name of a Node
     * @param node // The AST node
     */
    static getName(node: Node): string {
        switch (node.getKind()) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Parameter:
                return node.compilerNode['name']?.['escapedText'] ?? '';
            case SyntaxKind.Identifier:
                return node.compilerNode['escapedText'];
            default:
                return undefined;
        }
    }


    /**
     * Checks if a node is a call to a function or method
     * Example : a.slice(1)
     * @param node      // The node to check
     */
    static isFunctionCall(node: Node): boolean {
        if (node.getKind() === SyntaxKind.PropertyAccessExpression) {
            return false;
        }
        const parent: Node = node?.getParent();
        if (!parent) {
            return false;
        }
        const grandParent: Node = parent?.getParent();
        if (!grandParent) {
            return false;
        }
        const grandParentCall = grandParent.getKind() === SyntaxKind.CallExpression && grandParent.compilerNode['expression'].end === node.getEnd();
        const parentCall = parent.getKind() === SyntaxKind.CallExpression && parent.compilerNode['expression'].end === node.getEnd();

        return parentCall || grandParentCall;
    }


    static isVarStatement(node: Node): node is VariableStatement {
        return node.getKind() === SyntaxKind.VariableStatement;
    }


    static getType(varStatement: VariableStatement): string {
        if (!varStatement) {
            return undefined;
        }
        const varDeclaration: VariableDeclaration  = varStatement?.getFirstDescendantByKind(SyntaxKind.VariableDeclaration);
        return varDeclaration.getStructure().type as string;
    }
}
