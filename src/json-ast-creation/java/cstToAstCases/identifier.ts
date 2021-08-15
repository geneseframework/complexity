import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: Infos, children): any {
    const astNode = {
        kind: 'Identifier',
        start: cstNode.startOffset,
        end: cstNode.endOffset + 1,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
    setType(astNode);
    return astNode ;
}

function setType(astNode) {
    switch (astNode.name) {
        case 'forEach':
            astNode.type = 'function';
            return astNode;
    }
}
