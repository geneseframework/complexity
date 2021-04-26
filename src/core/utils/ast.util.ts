import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';


export function firstSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}


export function secondSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[1];
}
