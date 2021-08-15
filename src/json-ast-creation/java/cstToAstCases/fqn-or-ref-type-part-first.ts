import { cstToAst } from '../cst-to-ast';
import { FqnOrRefTypePartFirst } from '../models/fqn-or-ref-type-part-first.model';
import { FqnOrRefTypePartFirstChildren } from '../models/fqn-or-ref-type-part-first-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefTypePartFirst, children: FqnOrRefTypePartFirstChildren): any {
    const fqnOrRefTypePartCommon = children.fqnOrRefTypePartCommon;

    return [
        ...[].concat(...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? [])
    ]
}
