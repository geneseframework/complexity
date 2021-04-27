import { AstMethod } from '../../models/ast/ast-method.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { AstNodeService } from './ast-node.service';
import { Ast } from './ast.service';
import * as chalk from 'chalk';

export class ArrowFunctionsService {

    static getArrowFunctions(astNode: AstNode): AstMethod[] {
        const statements: AstNode[] = this.getStatementsDeclaringOrAssigningArrowFunctions(astNode);
        const arrowFunctions: AstMethod[] = [];
        for (const statement of statements) {
            arrowFunctions.push(...this.addVarStatementArrowFunction(statement));
        }
        return arrowFunctions;
    }


    private static getStatementsDeclaringOrAssigningArrowFunctions(astNode: AstNode): AstNode[] {
        console.log(chalk.yellowBright('GET STTTTTT'), astNode.kind);
        const varStatements: AstNode[] = astNode.children?.filter(n => n.isKeyword);
        const exprStatements: AstNode[] = astNode.children?.filter(n => n.isExpressionStatement && n.hasArrowFunctionDescendant);
        console.log(chalk.magentaBright('VAR STTTTTT'), varStatements);
        console.log(chalk.magentaBright('EXPR STTTTTT'), exprStatements);
        return varStatements.concat(exprStatements);
    }


    private static createArrowFunction(astNode: AstNode): AstMethod {
        const arrowFunction = new AstMethod();
        arrowFunction.name = astNode.children[0]?.name;
        arrowFunction.astNode = astNode;
        const astNodeService = new AstNodeService();      // The service managing AstNodes
        arrowFunction.astNode.text = astNodeService.getCode(astNode);
        arrowFunction.isArrowFunction = true;
        arrowFunction.codeLines = astNode.astFile?.code?.lines?.slice(astNode.linePos - 1, astNode.lineEnd);
        return arrowFunction
    }


    private static addVarStatementArrowFunction(statement: AstNode): AstMethod[] {
        const variableDeclarationList = statement.children?.[0];
        const variableDeclaration = variableDeclarationList?.children?.[0];
        if (variableDeclaration && Ast.hasArrowFunctionChild(variableDeclaration)) {
            return [this.createArrowFunction(variableDeclaration)];
        } else {
            return [];
        }
    }

}
