import { cstToAst } from '../cst-to-ast';
import { FqnOrRefTypePartRest } from '../models/fqn-or-ref-type-part-rest.model';
import { FqnOrRefTypePartRestChildren } from '../models/fqn-or-ref-type-part-rest-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefTypePartRest, children: FqnOrRefTypePartRestChildren): any {
    const fqnOrRefTypePartCommon = children.fqnOrRefTypePartCommon;

    return [
        ...[].concat(...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? [])
    ]
}
