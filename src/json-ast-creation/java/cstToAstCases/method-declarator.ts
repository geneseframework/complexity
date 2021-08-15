import { cstToAst } from '../cst-to-ast';
import { MethodDeclarator } from '../models/method-declarator.model';
import { MethodDeclaratorChildren } from '../models/method-declarator-children.model';

// @ts-ignore
export function run(cstNode: MethodDeclarator, children: MethodDeclaratorChildren): any {
    const identifier = children.Identifier;
    const formalParameterList = children.formalParameterList;

    return [
        ...identifier.map(e => cstToAst(e, 'identifier')),
        ...[].concat(...formalParameterList?.map(e => cstToAst(e)) ?? []),
    ];
}
