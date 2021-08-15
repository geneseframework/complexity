import { cstToAst, getBinaryOperatorName } from '../cst-to-ast';
import { BinaryExpression } from '../models/binary-expression.model';
import { BinaryExpressionChildren } from '../models/binary-expression-children.model';
import { binaryOperatorsPrecedence } from '../const/bin-ops-precedence';

// @ts-ignore
export function run(cstNode: BinaryExpression, children: BinaryExpressionChildren): any {
    const unaryExpressions = children.unaryExpression;
    const binaryOperators = children.BinaryOperator;
    const less = children.Less;
    const greater = children.Greater;

    const assignmentOperator = children.AssignmentOperator;
    const unaryExpressionsAst = [...[].concat(...unaryExpressions.map(e => cstToAst(e)))];
    if (binaryOperators || less || greater) {
        return binaryOperatorsCase(binaryOperators, less, greater, unaryExpressionsAst);
    } else if (assignmentOperator) {
        return assignmentOperatorCase(cstNode, children, unaryExpressionsAst, assignmentOperator);
    } else {
        return [
            ...unaryExpressionsAst,
        ];
    }
}

function binaryOperatorsCase(binaryOperators, less, greater, unaryExpressionsAst) {
    let binaryOperatorsAst = constructBinaryOperatorsAst(binaryOperators, less, greater);
    const alternate = [];
    for (let i = 0; i < binaryOperatorsAst.length; i++) {
        alternate.push(unaryExpressionsAst[i], binaryOperatorsAst[i]);
    }
    alternate.push(...unaryExpressionsAst.slice(binaryOperatorsAst.length), ...binaryOperatorsAst.slice(binaryOperatorsAst.length));
    const separatedExps = splitExpression(alternate);
    return toBinaryExpression(separatedExps.op, separatedExps.left, separatedExps.right);
}

function constructBinaryOperatorsAst(binaryOperators, less, greater) {
    let binaryOperatorsAst = binaryOperators?.map(e => cstToAst(e, 'binaryOperator')) ?? [];
    const lessAndGreaterAst = [];
    lessAndGreaterAst.push(...reconstructOperators(less));
    lessAndGreaterAst.push(...reconstructOperators(greater));
    lessAndGreaterAst.forEach(op => {
        binaryOperatorsAst.push({
            kind: getBinaryOperatorName(op.map(e => e.image).join('')),
            start: op[0].startOffset,
            end: op[op.length - 1].endOffset,
            pos: op[0].startOffset
        });
    });
    binaryOperatorsAst = binaryOperatorsAst.sort((a, b) => {
        return a.start - b.start;
    });
    return binaryOperatorsAst;
}

function assignmentOperatorCase(cstNode, children, unaryExpressionsAst, assignmentOperator) {
    const expression = children.expression;
    return {
        kind: 'BinaryExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...unaryExpressionsAst,
            ...assignmentOperator?.map(e => cstToAst(e, 'assignmentOperator')) ?? [],
            ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
        ]
    };
}

function reconstructOperators(elements: any[]): any {
    if (!elements || elements.length === 0) return [];
    const result = [];
    const indexes = elements.map((e, i) => {
        return e?.startOffset + 1 === elements[i + 1]?.startOffset ? null : i + 1;
    }).filter(e => e);
    indexes.forEach((i, index) => {
        result.push(elements.slice(indexes[index - 1] ?? 0, i));
    });
    return result;
}

function splitExpression(list) {
    if (list.length === 1) {
        return list[0];
    }
    const result = {
        op: undefined,
        left: undefined,
        right: undefined
    };
    binaryOperatorsPrecedence.forEach(ops => {
        const index = list.findIndex(e => ops.includes(e.kind));
        if (index !== -1 && !result.op) {
            result.op = list[index];
            result.left = splitExpression(list.slice(0, index));
            result.right = splitExpression(list.slice(index + 1, list.length + 1));
        }
    });
    return result;
}

function toBinaryExpression(op, left, right): any {
    const children = [
        left.op ? toBinaryExpression(left.op, left.left, left.right) : left,
        op,
        right.op ? toBinaryExpression(right.op, right.left, right.right) : right,
    ];
    let mostLeft = left;
    while (mostLeft.left) {
        mostLeft = mostLeft.left;
    }
    let mostRight = right;
    while (mostRight.right) {
        mostRight = mostRight.right;
    }
    return {
        kind: 'BinaryExpression',
        start: mostLeft.start,
        end: mostRight.end,
        pos: mostLeft.pos,
        children: children
    };
}
