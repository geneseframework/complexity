import { cstToAst } from '../cst-to-ast';
import { FqnOrRefType } from '../models/fqn-or-ref-type.model';
import { FqnOrRefTypeChildren } from '../models/fqn-or-ref-type-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefType, children: FqnOrRefTypeChildren): any {
    const fqnOrRefTypePartFirst = children.fqnOrRefTypePartFirst;
    const fqnOrRefTypePartRest = children.fqnOrRefTypePartRest;

    return [
        ...[].concat(...fqnOrRefTypePartFirst?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...fqnOrRefTypePartRest?.map(e => cstToAst(e)) ?? [])
    ]
}
