import { getBinaryOperatorName } from '../cst-to-ast';
import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: Infos, children): any {
    return {
        kind: getBinaryOperatorName(cstNode.image),
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
    };
}
