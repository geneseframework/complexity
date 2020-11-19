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
    var methodHeader = children.methodHeader;
    var methodBody = children.methodBody;
    var methodHeaderAst = methodHeader.map(function (e) { return cst_to_ast_1.cstToAst(e); });
    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        name: getName(methodHeaderAst),
        children: __spreadArrays([].concat.apply([], methodHeaderAst), [].concat.apply([], methodBody.map(function (e) { return cst_to_ast_1.cstToAst(e); })))
    };
}
exports.run = run;
function getName(methodHeaderAst) {
    var _a, _b, _c;
    return (_c = (_b = (_a = methodHeaderAst === null || methodHeaderAst === void 0 ? void 0 : methodHeaderAst[0]) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '';
}
