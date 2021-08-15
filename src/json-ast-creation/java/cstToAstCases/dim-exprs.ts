import { cstToAst } from '../cst-to-ast';
import { DimExprs } from '../models/dim-exprs.model';
import { DimExprsChildren } from '../models/dim-exprs-children.model';

// @ts-ignore
export function run(cstNode: DimExprs, children: DimExprsChildren): any {
    const dimExpr = children.dimExpr;

    return {
        kind: 'DimExprs',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...dimExpr?.map(e => cstToAst(e)) ?? [])
        ]
    }  
}
