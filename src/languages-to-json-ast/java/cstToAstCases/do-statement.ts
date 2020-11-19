import { cstToAst } from '../cst-to-ast';
import { DoStatement } from '../models/do-statement.model';
import { DoStatementChildren } from '../models/do-statement-children.model';

// @ts-ignore
export function run(cstNode: DoStatement, children: DoStatementChildren): any {
    const expressions = children.expression;
    const statements = children.statement;

    return {
        kind: 'DoStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...statements.map(e => cstToAst(e)) ?? []),
            ...[].concat(...expressions.map(e => cstToAst(e)) ?? [])
        ]
    };
}
