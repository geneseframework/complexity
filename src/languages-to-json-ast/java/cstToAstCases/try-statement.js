"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.run = void 0;
var cst_to_ast_1 = require("../cst-to-ast");
function run(cstNode, children) {
    var _a, _b, _c;
    var block = children.block;
    var catches = children.catches;
    var finallyBlock = children["finally"];
    return {
        kind: 'TryStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: __spreadArrays([].concat.apply([], (_a = block === null || block === void 0 ? void 0 : block.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []), [].concat.apply([], (_b = catches === null || catches === void 0 ? void 0 : catches.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []), [].concat.apply([], ((_c = finallyBlock === null || finallyBlock === void 0 ? void 0 : finallyBlock.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _c !== void 0 ? _c : [])))
    };
}
exports.run = run;
