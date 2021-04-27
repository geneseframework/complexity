import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../enum/syntax-kind.enum';
import { flat } from './arrays.util';


export function getFirstChild(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}


export function getFirstChildOfKind(astNode: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    return astNode?.children?.find(c => c.kind === kind);
}


export function getFirstDescendantOfKind(astNode: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    if (!astNode?.children) {
        return undefined;
    }
    const child: AstNodeInterface = this.getFirstChildOfKind(astNode, kind);
    return child ?? this.getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNode.children, kind);
}


function getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodes: AstNodeInterface[], kind: SyntaxKind): AstNodeInterface {
    if (!astNodes || astNodes.length === 0) {
        return undefined;
    }
    for (const astNode of astNodes) {
        if (astNode.kind === kind) {
            return astNode;
        }
    }
    return this.getFirstDescendantOfAstNodeInterfaceArrayOfKind(flat(astNodes.map(a => a.children)), kind);
}


export function arrowFunctionBlock(arrowFunctionNodeInterface: AstNodeInterface): AstNodeInterface {
    return getFirstChildOfKind(arrowFunctionOfVarStatement(arrowFunctionNodeInterface), SyntaxKind.Block);
}


export function arrowFunctionOfVarStatement(varStatement: AstNodeInterface): AstNodeInterface {
    return getFirstChildOfKind(getFirstChild(getFirstChild(varStatement)), SyntaxKind.ArrowFunction);
}
