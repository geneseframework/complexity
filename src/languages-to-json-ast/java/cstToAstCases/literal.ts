import { Literal } from '../models/literal.model';
import { LiteralChildren } from '../models/literal.children.model';

// @ts-ignore
export function run(cstNode: Literal, children: LiteralChildren): any {
    const nullLiteral = children.Null;
    if (nullLiteral) {
        return {
            kind: 'NullKeyword',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
        };
    }

    return {
        kind: 'Literal',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
    };
}
