import { cstToAst } from '../cst-to-ast';
import { PrimitiveCastExpression } from '../models/primitive-cast-expression.model';
import { PrimitiveCastExpressionChildren } from '../models/primitive-cast-expression-children.model';

// @ts-ignore
export function run(cstNode: PrimitiveCastExpression, children: PrimitiveCastExpressionChildren): any {
    const primitiveType = children.primitiveType;
    const unaryExpression = children.unaryExpression;

    return [
        ...[].concat(...primitiveType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...unaryExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
