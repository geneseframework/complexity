import { cstToAst } from '../cst-to-ast';
import { TypeArgumentList } from '../models/type-argument-list.model';
import { TypeArgumentListChildren } from '../models/type-argument-list-children.model';

// @ts-ignore
export function run(cstNode: TypeArgumentList, children: TypeArgumentListChildren): any {
    const typeArgument = children.typeArgument;

    return [
        ...[].concat(...typeArgument?.map(e => cstToAst(e)) ?? []),
    ];
}
