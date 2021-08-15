import { cstToAst } from '../cst-to-ast';
import { ParenthesisExpression } from '../models/parenthesis-expression.model';
import { ParenthesisExpressionChildren } from '../models/parenthesis-expression-children.model';

// @ts-ignore
export function run(cstNode: ParenthesisExpression, children: ParenthesisExpressionChildren): any {
    const expression = children.expression;

    return {
        kind: 'ParenthesisExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expression.map(e => cstToAst(e)))
        ]
    };
}
