"use strict";
exports.__esModule = true;
exports.run = void 0;
// @ts-ignore
function run(cstNode, children) {
    return {
        kind: 'Double',
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset,
        name: cstNode.image
    };
}
exports.run = run;
