import { KindAliases } from '../../globals.const';
import { Expression, Node, ParameterDeclaration, SyntaxKind, VariableDeclaration, VariableStatement } from 'ts-morph';
import { isFunctionKind } from '../types/function-kind.type';
import { FunctionNode } from '../types/function-node.type';

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


    static isParameter(node: Node): node is ParameterDeclaration {
        return node.getKind() === SyntaxKind.Parameter;
    }


    static isVarStatement(node: Node): node is VariableStatement {
        return node.getKind() === SyntaxKind.VariableStatement;
    }


    static isFunctionNode(node: Node): node is FunctionNode {
        return isFunctionKind(node.getKind());
    }


    static getFunctionType(functionNode: FunctionNode): string {
        if (!this.hasCompilerNodeType(functionNode)) {
            return undefined;
        } else {
            return this.sanitizeType(functionNode?.getReturnType()?.getText());
        }
    }


    static getParameterType(parameterNode: ParameterDeclaration): string {
        const trivialInitializer: string = this.getTrivialInitializer(parameterNode);
        if (!this.hasCompilerNodeType(parameterNode) && !trivialInitializer) {
            return undefined;
        } else {
            return this.sanitizeType(parameterNode.getType().getText());
        }
    }


    static getVarStatementType(varStatement: VariableStatement): string {
        const trivialInitializer: string = this.getTrivialInitializer(varStatement);
        if (!varStatement && !trivialInitializer) {
            return undefined;
        }
        const varDeclaration: VariableDeclaration  = varStatement?.getFirstDescendantByKind(SyntaxKind.VariableDeclaration);
        const type: string = this.sanitizeType(varDeclaration.getStructure().type as string);
        return trivialInitializer ?? type;
    }


    private static hasCompilerNodeType(node: FunctionNode | ParameterDeclaration): boolean {
        return !!node?.compilerNode?.type;
    }


    private static getTrivialInitializer(node: VariableStatement | ParameterDeclaration): string {
        let initializer: Expression = this.isVarStatement(node) ? node?.getFirstDescendantByKind(SyntaxKind.VariableDeclaration).getInitializer() : node.getInitializer();
        return this.isLiteralOrNewExpression(initializer) ? initializer.getKindName() : undefined;
    }


    private static isLiteralOrNewExpression(expression: Expression): boolean {
        return [SyntaxKind.NumericLiteral, SyntaxKind.StringLiteral, SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.NewExpression].includes(expression?.getKind());
    }


    private static sanitizeType(type: string): string {
        return type?.includes('import') ? 'import' : type;
    }


}
