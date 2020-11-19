import { cstToAst } from '../cst-to-ast';
import { ConstantExpression } from '../models/constant-expression.model';
import { ConstantExpressionChildren } from '../models/constant-expression-children.model';

// @ts-ignore
export function run(cstNode: ConstantExpression, children: ConstantExpressionChildren): any {
    const expressions = children.expression;

    return [
        ...[].concat(...expressions?.map(e => cstToAst(e)) ?? [])
    ];
}
