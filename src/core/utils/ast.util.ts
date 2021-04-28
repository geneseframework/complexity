import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../enum/syntax-kind.enum';
import { flat } from './arrays.util';

/**
 * Returns the first child of a given AstNodeInterface
 * @param astNodeInterface  // The AstNodeInterface to check
 */
export function getFirstChild(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}

/**
 * Returns the first child by SyntaxKind of a given AstNodeInterface
 * @param astNodeInterface  // The AstNodeInterface to check
 */
export function getFirstChildByKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    return astNodeInterface?.children?.find(c => c.kind === kind);
}


/**
 * Returns the first descendant by SyntaxKind of a given AstNodeInterface
 * @param astNodeInterface  // The AstNodeInterface to check
 */
export function getFirstDescendantByKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    if (!astNodeInterface?.children) {
        return undefined;
    }
    const child: AstNodeInterface = getFirstChildByKind(astNodeInterface, kind);
    return child ?? getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodeInterface.children, kind);
}

/**
 * Returns the first descendant of a given SyntaxKind in a given array of AstNodeInterface
 * @param astNodeInterfaces  // The AstNodeInterfaces to check
 * @param kind
 */
function getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodeInterfaces: AstNodeInterface[], kind: SyntaxKind): AstNodeInterface {
    if (!astNodeInterfaces || astNodeInterfaces.length === 0) {
        return undefined;
    }
    const definedAstNodeInterfaces: AstNodeInterface[] = astNodeInterfaces.filter(a => !!a);
    for (const astNode of definedAstNodeInterfaces) {
        if (astNode.kind === kind) {
            return astNode;
        }
    }
    return getFirstDescendantOfAstNodeInterfaceArrayOfKind(flat(definedAstNodeInterfaces.map(a => a.children)), kind);
}

/**
 * Returns the first Block AstNode which is a child of a given ArrowFunction AstNodeInterface
 * @param arrowFunctionNodeInterface  // The AstNodeInterface to check
 */
export function arrowFunctionBlock(arrowFunctionNodeInterface: AstNodeInterface): AstNodeInterface {
    return getFirstChildByKind(arrowFunctionOfVarStatement(arrowFunctionNodeInterface), SyntaxKind.Block);
}

/**
 * Returns the first ArrowFunction AstNode of a given VarStatement AstNode
 * @param varStatement              // The astNode to check
 */
export function arrowFunctionOfVarStatement(varStatement: AstNodeInterface): AstNodeInterface {
    return getFirstChildByKind(getFirstChild(getFirstChild(varStatement)), SyntaxKind.ArrowFunction);
}
