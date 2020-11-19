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
    var _a;
    var interfaceMemberDeclaration = children.interfaceMemberDeclaration;
    return __spreadArrays([].concat.apply([], (_a = interfaceMemberDeclaration === null || interfaceMemberDeclaration === void 0 ? void 0 : interfaceMemberDeclaration.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []));
}
exports.run = run;
