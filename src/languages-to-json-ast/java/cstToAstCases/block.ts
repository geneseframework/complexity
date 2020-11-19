import { cstToAst } from '../cst-to-ast';
import { Block } from '../models/block.model';
import { BlockChildren } from '../models/block-children.model';

// @ts-ignore
export function run(cstNode: Block, children: BlockChildren): any {
    return {
        kind: 'Block',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...children.blockStatements?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
