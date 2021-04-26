import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../enum/syntax-kind.enum';
import { Ast } from '../../json-ast-to-reports/services/ast/ast.service';


export function firstSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}

export function firstSonOfKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    return astNodeInterface?.children?.find(c => c.kind === kind);
}


export function secondSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[1];
}


export function arrowFunctionBlock(arrowFunctionNodeInterface: AstNodeInterface): AstNodeInterface {
    return firstSonOfKind(arrowFunctionOfVarStatement(arrowFunctionNodeInterface), SyntaxKind.Block);
}


export function arrowFunctionOfVarStatement(varStatement: AstNodeInterface): AstNodeInterface {
    return firstSonOfKind(firstSon(firstSon(varStatement)), SyntaxKind.ArrowFunction);
}
