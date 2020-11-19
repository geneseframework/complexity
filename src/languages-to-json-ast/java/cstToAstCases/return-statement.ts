import { cstToAst } from '../cst-to-ast';
import { ReturnStatement } from '../models/return-statement.model';
import { ReturnStatementChildren } from '../models/return-statement-children.model';

// @ts-ignore
export function run(cstNode: ReturnStatement, children: ReturnStatementChildren): any {
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...children.expression?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
