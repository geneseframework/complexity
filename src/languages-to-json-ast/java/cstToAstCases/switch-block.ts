import { cstToAst } from '../cst-to-ast';
import { SwitchBlock } from '../models/switch-block.model';
import { SwitchBlockChildren } from '../models/switch-block-children.model';

// @ts-ignore
export function run(cstNode: SwitchBlock, children: SwitchBlockChildren): any {
    const switchCase = children.switchCase;

    return {
        kind: 'CaseBlock',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: switchCase ? [
            ...[].concat(...switchCase.map(e => cstToAst(e)) ?? []),
        ] : [],
    };
}
