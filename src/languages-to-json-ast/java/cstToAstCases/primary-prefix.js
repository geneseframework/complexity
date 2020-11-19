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
    var _a, _b, _c, _d, _e, _f;
    var parenthesisExpression = children.parenthesisExpression;
    var fqnOrRefType = children.fqnOrRefType;
    var literal = children.literal;
    var this_ = children.This;
    var newExpression = children.newExpression;
    var castExpression = children.castExpression;
    return __spreadArrays([].concat.apply([], (_a = parenthesisExpression === null || parenthesisExpression === void 0 ? void 0 : parenthesisExpression.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []), [].concat.apply([], (_b = fqnOrRefType === null || fqnOrRefType === void 0 ? void 0 : fqnOrRefType.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []), [].concat.apply([], (_c = literal === null || literal === void 0 ? void 0 : literal.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _c !== void 0 ? _c : []), [].concat.apply([], (_d = newExpression === null || newExpression === void 0 ? void 0 : newExpression.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _d !== void 0 ? _d : []), [].concat.apply([], (_e = castExpression === null || castExpression === void 0 ? void 0 : castExpression.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _e !== void 0 ? _e : []), (_f = this_ === null || this_ === void 0 ? void 0 : this_.map(function (e) { return cst_to_ast_1.cstToAst(e, 'this'); })) !== null && _f !== void 0 ? _f : []);
}
exports.run = run;
