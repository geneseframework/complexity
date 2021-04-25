import { AstMethod } from '../../models/ast/ast-method.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { Options } from '../../../core/models/options.model';
import { ReactService } from '../../../languages-to-json-ast/ts/services/specific/react.service';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { AstNodeService } from './ast-node.service';

export class ArrowFunctionsService {

    static getArrowFunctions(node: AstNode): AstMethod[] {
        const varStatements: AstNode[] = node.children?.filter(n => n.kind === 'Keyword');
        const arrowFunctions: AstMethod[] = [];
        for (const astNode of varStatements) {
            const variableDeclarationList = astNode.children?.[0];
            const variableDeclaration = variableDeclarationList?.children?.[0];
            if (variableDeclaration && this.hasArrowFunctionChild(variableDeclaration)) {
                const arrowFunction = new AstMethod();
                arrowFunction.name = variableDeclaration.children[0]?.name;
                arrowFunction.astNode = variableDeclaration;
                const astNodeService = new AstNodeService();      // The service managing AstNodes
                arrowFunction.astNode.text = astNodeService.getCode(variableDeclaration);
                arrowFunction.isArrowFunction = true;
                arrowFunction.codeLines = variableDeclaration.astFile?.code?.lines?.slice(variableDeclaration.linePos - 1, variableDeclaration.lineEnd);
                arrowFunctions.push(arrowFunction);
            }
        }
        return arrowFunctions;
    }


    private static hasArrowFunctionChild(astNode: AstNode): boolean {
        return astNode.children.map(c => c.kind).includes(SyntaxKind.ArrowFunction);
    }

}
