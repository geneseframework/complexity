import { cstToAst } from '../cst-to-ast';
import { Finally } from '../models/finally.model';
import { FinallyChildren } from '../models/finally-children.model';


export function run(cstNode: Finally, children: FinallyChildren) {
    const block = children.block;

    return {
        kind: 'Block',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [...[].concat(...block.map(e => cstToAst(e)))]
    };

}
