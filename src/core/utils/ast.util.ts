import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../enum/syntax-kind.enum';


export function firstSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}

export function firstSonOfKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    return astNodeInterface?.children?.find(c => c.kind === kind);
}


export function secondSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[1];
}
