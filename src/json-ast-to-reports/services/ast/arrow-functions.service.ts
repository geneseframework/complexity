import { AstMethod } from '../../models/ast/ast-method.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { AstNodeService } from './ast-node.service';
import { Ast } from './ast.service';
import * as chalk from 'chalk';

export class ArrowFunctionsService {

    static getArrowFunctions(astNode: AstNode): AstMethod[] {
        const statements: AstNode[] = this.getStatementsDeclaringOrAssigningArrowFunctions(astNode);
        const arrowFunctions: AstMethod[] = [];
        for (const statement of statements) {
            const arrowFunction: AstMethod = statement.isExpressionStatement ? this.getExprStatementArrowFunction(statement) :  this.getVarStatementArrowFunction(statement);
            if (arrowFunction) {
                arrowFunctions.push(arrowFunction);
            }
        }
        return arrowFunctions;
    }


    private static getStatementsDeclaringOrAssigningArrowFunctions(astNode: AstNode): AstNode[] {
        console.log(chalk.yellowBright('GET STTTTTT'), astNode.kind);
        const varStatements: AstNode[] = astNode.children?.filter(n => n.isKeyword && n.hasArrowFunctionDescendant);
        const exprStatements: AstNode[] = astNode.children?.filter(n => n.isExpressionStatement && n.hasArrowFunctionDescendant);
        console.log(chalk.magentaBright('VAR STTTTTT'), varStatements);
        console.log(chalk.magentaBright('EXPR STTTTTT'), exprStatements);
        return varStatements.concat(exprStatements);
    }


    private static getVarStatementArrowFunction(statement: AstNode): AstMethod {
        const variableDeclarationList: AstNode = statement.children?.[0];
        const variableDeclaration: AstNode = variableDeclarationList?.children?.[0];
        return variableDeclaration ? this.createArrowFunction(variableDeclaration, statement.children[0]?.name) : undefined;
    }


    private static getExprStatementArrowFunction(statement: AstNode): AstMethod {
        const expression: AstNode = statement.children[0];
        const identifiers: AstNode[] = expression.children[0]?.children?.filter(c => c.isIdentifier);
        const name: string = identifiers.map(i => i.name).join('.');
        // const variableDeclaration = variableDeclarationList?.children?.[0];
        // return variableDeclaration && Ast.hasArrowFunctionChild(variableDeclaration) ? this.createArrowFunction(variableDeclaration) : undefined;
        return undefined;
    }


    private static createArrowFunction(astNode: AstNode, name: string): AstMethod {
        const arrowFunction = new AstMethod();
        arrowFunction.name = name;
        arrowFunction.astNode = astNode;
        const astNodeService = new AstNodeService();
        arrowFunction.astNode.text = astNodeService.getCode(astNode);
        arrowFunction.isArrowFunction = true;
        arrowFunction.codeLines = astNode.astFile?.code?.lines?.slice(astNode.linePos - 1, astNode.lineEnd);
        return arrowFunction;
    }

}
