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
    var _a, _b, _c, _d, _e, _f, _g;
    var binaryExpressions = children.binaryExpression;
    var expression = children.expression;
    var expressionAst = [].concat.apply([], (_a = expression === null || expression === void 0 ? void 0 : expression.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []);
    if (children.QuestionMark) {
        return {
            kind: 'ConditionalExpression',
            start: expressionAst[0].start,
            end: expressionAst[1].end,
            pos: expressionAst[0].pos,
            children: __spreadArrays([].concat.apply([], (_b = binaryExpressions === null || binaryExpressions === void 0 ? void 0 : binaryExpressions.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []), (_d = (_c = children.QuestionMark) === null || _c === void 0 ? void 0 : _c.map(function (e) { return cst_to_ast_1.cstToAst(e, 'questionMark'); })) !== null && _d !== void 0 ? _d : [], [
                expressionAst[0]
            ], (_f = (_e = children.Colon) === null || _e === void 0 ? void 0 : _e.map(function (e) { return cst_to_ast_1.cstToAst(e, 'colonToken'); })) !== null && _f !== void 0 ? _f : [], [
                expressionAst[1]
            ])
        };
    }
    else {
        return __spreadArrays([].concat.apply([], (_g = binaryExpressions === null || binaryExpressions === void 0 ? void 0 : binaryExpressions.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _g !== void 0 ? _g : []), expressionAst);
    }
}
exports.run = run;
