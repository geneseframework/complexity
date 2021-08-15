import { cstToAst } from '../cst-to-ast';
import { DimExpr } from '../models/dim-expr.model';
import { DimExprChildren } from '../models/dim-expr-children.model';

// @ts-ignore
export function run(cstNode: DimExpr, children: DimExprChildren): any {
    const expression = children.expression;

    return [
            ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ];
}
