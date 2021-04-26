import { AstMethod } from '../../models/ast/ast-method.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { AstNodeService } from './ast-node.service';

export class ArrowFunctionsService {

    static getArrowFunctions(node: AstNode): AstMethod[] {
        const statements: AstNode[] = this.getStatementsDeclaringOrAssigningArrowFunctions(node);
        const arrowFunctions: AstMethod[] = [];
        for (const astNode of statements) {
            const variableDeclarationList = astNode.children?.[0];
            const variableDeclaration = variableDeclarationList?.children?.[0];
            if (variableDeclaration && this.hasArrowFunctionChild(variableDeclaration)) {
                arrowFunctions.push(this.createArrowFunction(variableDeclaration));
            }
        }
        return arrowFunctions;
    }


    private static getStatementsDeclaringOrAssigningArrowFunctions(node: AstNode): AstNode[] {
        const varStatements: AstNode[] = node.children?.filter(n => n.kind === 'Keyword');
        return varStatements;
    }


    private static hasArrowFunctionChild(astNode: AstNode): boolean {
        return astNode.children.map(c => c.kind).includes(SyntaxKind.ArrowFunction);
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

}
