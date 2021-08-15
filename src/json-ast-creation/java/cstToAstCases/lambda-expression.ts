import { LambdaExpression } from '../models/lambda-expression.model';
import { LambdaExpressionChildren } from '../models/lambda-expression-children.model';
import { cstToAst } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode: LambdaExpression, children: LambdaExpressionChildren) {
    const lambdaParameters = children.lambdaParameters;
    const arrow = children.Arrow;
    const lambdaBody = children.lambdaBody;

    return {
        kind: 'ArrowFunction',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...lambdaParameters.map(e => cstToAst(e)) ?? []),
            ...[].concat(...arrow?.map(e => cstToAst(e, 'arrow')) ?? []),
            ...[].concat(...lambdaBody.map(e => cstToAst(e)) ?? [])
        ]
    } 
    
}
