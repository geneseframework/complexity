import { cstToAst } from '../cst-to-ast';
import { CatchClause } from '../models/catch-clause.model';
import { CatchClauseChildren } from '../models/catch-clause-children.model';


export function run(cstNode: CatchClause, children: CatchClauseChildren) {
    const block = children.block;
    const catchFormalParameter = children.catchFormalParameter;
    return {
        kind: 'CatchClause',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...(block.map((e) => cstToAst(e)) ?? [])),
            ...[].concat(...(catchFormalParameter.map((e) => cstToAst(e)) ?? []))
        ]
    };
}
