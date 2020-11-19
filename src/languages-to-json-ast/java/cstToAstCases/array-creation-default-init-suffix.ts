import { cstToAst } from '../cst-to-ast';
import { ArrayCreationDefaultInitSuffix } from '../models/array-creation-default-init-suffix.model';
import { ArrayCreationDefaultInitSuffixChildren } from '../models/array-creation-default-init-suffix-children.model';

// @ts-ignore
export function run(cstNode: ArrayCreationDefaultInitSuffix, children: ArrayCreationDefaultInitSuffixChildren): any {
    const dimExprs = children.dimExprs;

    return [
        ...[].concat(...dimExprs?.map(e => cstToAst(e)) ?? [])
    ];
}
