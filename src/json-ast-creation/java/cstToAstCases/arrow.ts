import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: Infos, children) {
    return {
        kind: 'EqualsGreaterThanToken',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
    };
}
