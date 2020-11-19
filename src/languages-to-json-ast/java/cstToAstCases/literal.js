"use strict";
exports.__esModule = true;
exports.run = void 0;
// @ts-ignore
function run(cstNode, children) {
    var nullLiteral = children.Null;
    if (nullLiteral) {
        return {
            kind: 'NullKeyword',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset
        };
    }
    return {
        kind: 'Literal',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset
    };
}
exports.run = run;
