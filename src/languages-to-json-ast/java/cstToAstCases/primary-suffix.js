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
    var _a, _b, _c, _d;
    var identifier = children.Identifier;
    var methodInvocationSuffix = children.methodInvocationSuffix;
    var classLiteralSuffix = children.classLiteralSuffix;
    var methodReferenceSuffix = children.methodReferenceSuffix;
    return __spreadArrays((_a = identifier === null || identifier === void 0 ? void 0 : identifier.map(function (e) { return cst_to_ast_1.cstToAst(e, 'identifier'); })) !== null && _a !== void 0 ? _a : [], [].concat.apply([], (_b = classLiteralSuffix === null || classLiteralSuffix === void 0 ? void 0 : classLiteralSuffix.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []), [].concat.apply([], (_c = methodInvocationSuffix === null || methodInvocationSuffix === void 0 ? void 0 : methodInvocationSuffix.map(function (e) { return cst_to_ast_1.cstToAst(e, 'methodInvocationSuffix'); })) !== null && _c !== void 0 ? _c : []), [].concat.apply([], (_d = methodReferenceSuffix === null || methodReferenceSuffix === void 0 ? void 0 : methodReferenceSuffix.map(function (e) { return cst_to_ast_1.cstToAst(e, 'methodReferenceSuffix'); })) !== null && _d !== void 0 ? _d : []));
}
exports.run = run;
