"use strict";
exports.__esModule = true;
exports.run = void 0;
var cst_to_ast_1 = require("../cst-to-ast");
// @ts-ignore
function run(cstNode, children) {
    return {
        kind: cst_to_ast_1.getBinaryOperatorName(cstNode.image),
        start: cstNode.startOffset,
        end: cstNode.endOffset,
        pos: cstNode.startOffset
    };
}
exports.run = run;
