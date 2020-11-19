import { cstToAst } from '../cst-to-ast';
import { ArrayAccessSuffix } from '../models/array-access-suffix.model';
import { ArrayAccessSuffixChildren } from '../models/array-access-suffix-children.model';

// @ts-ignore
export function run(cstNode: ArrayAccessSuffix, children: ArrayAccessSuffixChildren): any {
    const expression = children.expression;

    return {
        kind: 'ArrayAccessSuffix',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
