import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: Infos, children): any {

    return {
        kind: 'Identifier',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
}
