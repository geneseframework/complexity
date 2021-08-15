import { cstToAst } from '../cst-to-ast';
import { WhileStatementChildren } from '../models/while-statement-children.model';
import { WhileStatement } from '../models/while-statement.model';

// @ts-ignore
export function run(cstNode: WhileStatement, children: WhileStatementChildren): any {
    const expressions = children.expression;
    const statements = children.statement;

    return {
        kind: 'WhileStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expressions.map(e => cstToAst(e)) ?? []),
            ...[].concat(...statements.map(e => cstToAst(e)) ?? [])
        ]
    };
}
