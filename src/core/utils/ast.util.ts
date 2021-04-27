import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../enum/syntax-kind.enum';
import { Node } from 'ts-morph';


export function firstChild(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}

export function firstChildOfKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    return astNodeInterface?.children?.find(c => c.kind === kind);
}


export function arrowFunctionBlock(arrowFunctionNodeInterface: AstNodeInterface): AstNodeInterface {
    return firstChildOfKind(arrowFunctionOfVarStatement(arrowFunctionNodeInterface), SyntaxKind.Block);
}


export function arrowFunctionOfVarStatement(varStatement: AstNodeInterface): AstNodeInterface {
    return firstChildOfKind(firstChild(firstChild(varStatement)), SyntaxKind.ArrowFunction);
}


export function isJsx(node: Node): boolean {
    return node?.getKindName()?.slice(0, 3) === 'Jsx';
}
