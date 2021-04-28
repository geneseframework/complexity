import { KindAliases } from '../../globals.const';
import { Expression, Node, ParameterDeclaration, SyntaxKind, VariableDeclaration, VariableStatement } from 'ts-morph';
import { isFunctionKind } from '../types/function-kind.type';
import * as chalk from 'chalk';
import { FunctionNode } from '../types/function-node.type';
import { VariableInitializer } from '../../java/models/variable-initializer.model';

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
            const type: string = functionNode?.getReturnType()?.getText();
            return type.includes('import') ? 'import' : type;
        }
    }


    static getParameterType(parameterNode: ParameterDeclaration): string {
        const apparentType: string = parameterNode?.getType()?.getApparentType().getText();
        if (!this.hasCompilerNodeType(parameterNode) && !apparentType) {
            return undefined;
        } else {
            return apparentType ?? parameterNode.getType().getText();
        }
    }


    static getVarStatementType(varStatement: VariableStatement): string {
        let apparentType: string = varStatement?.getFirstDescendantByKind(SyntaxKind.Identifier)?.getType()?.getApparentType()?.getText();
        const trivialInitializer: string = this.getTrivialInitializer(varStatement);
        console.log(chalk.magentaBright('IDENTTTT TYPEDDDDD'), varStatement.getText(), trivialInitializer);
        if (!varStatement && !trivialInitializer) {
            return undefined;
        }
        const varDeclaration: VariableDeclaration  = varStatement?.getFirstDescendantByKind(SyntaxKind.VariableDeclaration);
        return trivialInitializer ?? varDeclaration.getStructure().type as string;
    }


    private static hasCompilerNodeType(node: FunctionNode | ParameterDeclaration): boolean {
        return !node || !node.compilerNode.type;
    }


    private static getTrivialInitializer(varStatement: VariableStatement): string {
        const initializer: Expression = varStatement?.getFirstDescendantByKind(SyntaxKind.VariableDeclaration).getInitializer();
        console.log(chalk.yellowBright('IDENTTTT TYPEDDDDD'), varStatement.getText());
        return this.isLiteralOrNewExpression(initializer) ? initializer.getKindName() : undefined;
    }


    private static isLiteralOrNewExpression(expression: Expression): boolean {
        return [SyntaxKind.NumericLiteral, SyntaxKind.StringLiteral, SyntaxKind.BooleanKeyword, SyntaxKind.NewExpression].includes(expression?.getKind());
    }
}
