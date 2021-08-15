import { cstToAst } from '../cst-to-ast';
import { TryStatementChildren } from '../models/try-statement-children.model';
import { TryStatement } from '../models/try-statement.model';


export function run(cstNode: TryStatement, children: TryStatementChildren) {
    const block = children.block;
    const catches = children.catches;
    const finallyBlock = children.finally;

    return {
        kind: 'TryStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...block?.map((e) => cstToAst(e)) ?? []),
            ...[].concat(...catches?.map((e) => cstToAst(e)) ?? []),
            ...[].concat(...(finallyBlock?.map((e) => cstToAst(e)) ?? [])),
        ],
    };
}
