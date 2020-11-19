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
    var unaryPrefixOperator = children.UnaryPrefixOperator;
    var primary = children.primary;
    if (unaryPrefixOperator) {
        var unaryPrefixOperatorAst = unaryPrefixOperator.map(function (e) { return cst_to_ast_1.cstToAst(e, 'unaryPrefixOperator'); });
        return toUnaryPrefixOperator(unaryPrefixOperatorAst, primary.map(function (e) { return cst_to_ast_1.cstToAst(e); }));
    }
    else {
        return __spreadArrays([].concat.apply([], primary.map(function (e) { return cst_to_ast_1.cstToAst(e); })));
    }
}
exports.run = run;
function toUnaryPrefixOperator(prefixes, primaries) {
    var res = undefined;
    var last = undefined;
    while (prefixes.length > 0) {
        var firstPrefix = prefixes.shift();
        if (!res) {
            last = firstPrefix;
            res = last;
        }
        else {
            last.children.push(firstPrefix);
            last = firstPrefix;
        }
    }
    last.children = __spreadArrays([].concat.apply([], primaries));
    return res;
}
