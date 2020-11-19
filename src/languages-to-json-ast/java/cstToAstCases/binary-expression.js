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
var syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
var genese_mapper_1 = require("genese-mapper");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b;
    var unaryExpressions = children.unaryExpression;
    var binaryOperators = children.BinaryOperator;
    var assignmentOperator = children.AssignmentOperator;
    var expression = children.expression;
    var unaryExpressionsAst = __spreadArrays([].concat.apply([], unaryExpressions.map(function (e) { return cst_to_ast_1.cstToAst(e); })));
    if (binaryOperators) {
        var binaryOperatorsAst = binaryOperators.map(function (e) { return cst_to_ast_1.cstToAst(e, 'binaryOperator'); });
        var andOrOperators_1 = binaryOperatorsAst.filter(function (op) { return [syntax_kind_enum_1.SyntaxKind.BarBarToken, syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken].includes(op.kind); });
        var aa = [];
        var i = 0;
        while (i < binaryOperatorsAst.length) {
            var op = binaryOperatorsAst[i];
            if ([syntax_kind_enum_1.SyntaxKind.BarBarToken, syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken].includes(op.kind)) {
                aa.push([[], [unaryExpressionsAst[i]]]);
            }
            else {
                aa.push([[op], [unaryExpressionsAst[i], unaryExpressionsAst[i + 1]]]);
                unaryExpressionsAst.splice(i + 1, 1);
            }
            i++;
        }
        var binExps = aa.map(function (exp) { return toBinaryExpression(genese_mapper_1.clone(exp[0]), genese_mapper_1.clone(exp[1])); });
        var children_1 = binExps.reduce(function (res, exp, i) { return res.concat(exp, andOrOperators_1[i]); }, []).filter(function (e) { return e; });
        return [{
                kind: 'BinaryExpression',
                start: cstNode.location.startOffset,
                end: cstNode.location.endOffset,
                pos: cstNode.location.startOffset,
                children: children_1
            }];
        //
        // if (andOrOperators.length > 0) {
        //     const andOrOperatorsIndexes = binaryOperatorsAst.map((op, i) => [SyntaxKind.BarBarToken, SyntaxKind.AmpersandAmpersandToken].includes(op.kind) ? i : -1).filter(e => e !== -1);
        //     andOrOperatorsIndexes.reverse().forEach(index => binaryOperatorsAst.splice(index, 1));
        //     const exps = [];
        //     andOrOperators.concat(null).forEach(_ => {
        //         exps.push([
        //             binaryOperatorsAst.splice(0, 1),
        //             unaryExpressionsAst.splice(0, 2)
        //         ]);
        //     });
        //     const binExps = exps.map(exp => toBinaryExpression(clone(exp[0]), clone(exp[1])));
        //     const children = binExps.reduce((res, exp, i) => res.concat(exp, andOrOperators[i]), []).filter(e => e);
        //     return [{
        //         kind: 'BinaryExpression',
        //         start: cstNode.location.startOffset,
        //         end: cstNode.location.endOffset,
        //         pos: cstNode.location.startOffset,
        //         children: children
        //     }];
        // } else {
        //     return [
        //         toBinaryExpression(binaryOperatorsAst, unaryExpressionsAst)
        //     ];
        // }
    }
    else if (assignmentOperator) {
        return {
            kind: 'BinaryExpression',
            start: cstNode.location.startOffset,
            end: cstNode.location.endOffset,
            pos: cstNode.location.startOffset,
            children: __spreadArrays(unaryExpressionsAst, (_a = assignmentOperator === null || assignmentOperator === void 0 ? void 0 : assignmentOperator.map(function (e) { return cst_to_ast_1.cstToAst(e, 'assignmentOperator'); })) !== null && _a !== void 0 ? _a : [], [].concat.apply([], (_b = expression === null || expression === void 0 ? void 0 : expression.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []))
        };
    }
    else {
        return __spreadArrays(unaryExpressionsAst);
    }
}
exports.run = run;
function toBinaryExpression(_ops, _exps) {
    var _a;
    if (!_ops || !_exps)
        return undefined;
    if (_ops.length > 0) {
        var firstExp = _exps.shift();
        var firstOp = _ops.shift();
        return {
            kind: 'BinaryExpression',
            start: firstExp.start,
            end: (_a = _exps[_exps.length - 1]) === null || _a === void 0 ? void 0 : _a.end,
            pos: firstExp.pos,
            children: [firstExp, firstOp, toBinaryExpression(_ops, _exps)]
        };
    }
    else {
        var children = [_exps[0], _ops[0], _exps[1]].filter(function (e) { return e; });
        if (children.length > 1) {
            return {
                kind: 'BinaryExpression',
                start: _exps[0].start,
                end: _exps[1].end,
                pos: _exps[0].pos,
                children: children
            };
        }
        else {
            return children[0];
        }
    }
}
