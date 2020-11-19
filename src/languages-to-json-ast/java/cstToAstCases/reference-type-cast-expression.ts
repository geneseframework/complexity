import { cstToAst } from '../cst-to-ast';
import { ReferenceTypeCastExpression } from '../models/reference-type-cast-expression.model';
import { ReferenceTypeCastExpressionChildren } from '../models/reference-type-cast-expression-children.model';

// @ts-ignore
export function run(cstNode: ReferenceTypeCastExpression, children: ReferenceTypeCastExpressionChildren): any {
    const referenceType = children.referenceType;
    const unaryExpressionNotPlusMinus = children.unaryExpressionNotPlusMinus;
    const lambdaExpression = children.lambdaExpression;

    return [
        ...[].concat(...referenceType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...unaryExpressionNotPlusMinus?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...lambdaExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
