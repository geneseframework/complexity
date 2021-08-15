import { cstToAst } from '../cst-to-ast';
import { ConstructorDeclaratorChildren } from '../models/constructor-declarator-children.model';
import { ConstructorDeclarator } from '../models/constructor-declarator.model';

// @ts-ignore
export function run(cstNode: ConstructorDeclarator, children: ConstructorDeclaratorChildren): any {
    const simpleTypeName = children.simpleTypeName;
    const formalParameterList = children.formalParameterList

    return [
        ...[].concat(...simpleTypeName?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...formalParameterList?.map(e => cstToAst(e)) ?? [])
    ];
}
