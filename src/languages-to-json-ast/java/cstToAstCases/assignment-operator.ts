import { getBinaryOperatorName } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode, children): any {
    return {
        kind: getBinaryOperatorName(cstNode.image),
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
    };
}
