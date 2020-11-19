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
// @ts-ignore
function run(cstNode, children) {
    var expression = children.expression;
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: __spreadArrays(generateAssertStatement(expression))
    };
}
exports.run = run;
/**
 * Generate Ast nodes for Assert Statement
 * @param  {Expression[]} expression
 * @returns any
 */
function generateAssertStatement(expression) {
    var _a, _b, _c, _d;
    if (Array.isArray(expression)) {
        return [
            {
                kind: 'IfStatement',
                start: expression[0].location.startOffset,
                end: expression[0].location.endOffset,
                pos: expression[0].location.startOffset,
                children: __spreadArrays([].concat.apply([], (_b = (_a = [expression[0]]) === null || _a === void 0 ? void 0 : _a.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []))
            },
            {
                kind: 'ThrowStatement',
                start: expression[1].location.startOffset,
                end: expression[1].location.endOffset,
                pos: expression[1].location.startOffset,
                children: __spreadArrays([].concat.apply([], (_d = (_c = [expression[1]]) === null || _c === void 0 ? void 0 : _c.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _d !== void 0 ? _d : []))
            }
        ];
    }
}
