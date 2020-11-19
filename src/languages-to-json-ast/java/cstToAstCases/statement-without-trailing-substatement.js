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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var block = children.block;
    var returnStatement = children.returnStatement;
    var switchStatement = children.switchStatement;
    var expressionStatement = children.expressionStatement;
    var doStatement = children.doStatement;
    var tryStatement = children.tryStatement;
    var throwStatement = children.throwStatement;
    var assertStatement = children.assertStatement;
    return __spreadArrays((_a = block === null || block === void 0 ? void 0 : block.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : [], (_b = returnStatement === null || returnStatement === void 0 ? void 0 : returnStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : [], (_c = switchStatement === null || switchStatement === void 0 ? void 0 : switchStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _c !== void 0 ? _c : [], (_d = expressionStatement === null || expressionStatement === void 0 ? void 0 : expressionStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _d !== void 0 ? _d : [], (_e = doStatement === null || doStatement === void 0 ? void 0 : doStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _e !== void 0 ? _e : [], (_f = tryStatement === null || tryStatement === void 0 ? void 0 : tryStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _f !== void 0 ? _f : [], (_g = throwStatement === null || throwStatement === void 0 ? void 0 : throwStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _g !== void 0 ? _g : [], (_h = assertStatement === null || assertStatement === void 0 ? void 0 : assertStatement.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _h !== void 0 ? _h : []);
}
exports.run = run;
