import { cstToAst } from '../cst-to-ast';
import { UnaryExpressionNotPlusMinus } from '../models/unary-expression-not-plus-minus.model';
import { UnaryExpressionNotPlusMinusChildren } from '../models/unary-expression-not-plus-minus-children.model';

// @ts-ignore
export function run(cstNode: UnaryExpressionNotPlusMinus, children: UnaryExpressionNotPlusMinusChildren): any {
    const primary = children.primary;

    return [
        ...[].concat(...primary?.map(e => cstToAst(e)) ?? [])
    ];
}
