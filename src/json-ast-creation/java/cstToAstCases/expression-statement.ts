import { cstToAst } from '../cst-to-ast';
import { ExpressionStatement } from '../models/expression-statement.model';
import { ExpressionStatementChildren } from '../models/expression-statement-children.model';

// @ts-ignore
export function run(cstNode: ExpressionStatement, children: ExpressionStatementChildren): any {
    const statementExpression = children.statementExpression;

    return {
        kind: 'ExpressionStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...statementExpression?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
