import { cstToAst } from '../cst-to-ast';
import { IfStatement } from '../models/if-statement.model';
import { IfStatementChildren } from '../models/if-statement-children.model';

// @ts-ignore
export function run(cstNode: IfStatement, children: IfStatementChildren): any {
    const expressions = children.expression;
    const statements = children.statement;

    return {
        kind: 'IfStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expressions.map(e => cstToAst(e)) ?? []),
            ...[].concat(...statements.map(e => cstToAst(e)) ?? [])
        ]
    };
}
