import { cstToAst } from '../cst-to-ast';
import { TernaryExpression } from '../models/ternary-expression.model';
import { TernaryExpressionChildren } from '../models/ternary-expression-children.model';

// @ts-ignore
export function run(cstNode: TernaryExpression, children: TernaryExpressionChildren): any {
    const binaryExpressions = children.binaryExpression;
    const expression = children.expression;
    const expressionAst = [].concat(...expression?.map(e => cstToAst(e)) ?? [])
    if (children.QuestionMark) {
        return questionMarkCase(expressionAst, children, binaryExpressions);
    } else {
        return [
            ...[].concat(...binaryExpressions?.map(e => cstToAst(e)) ?? []),
            ...expressionAst
        ];
    }
}

function questionMarkCase(expressionAst, children, binaryExpressions) {
    return {
        kind: 'ConditionalExpression',
        start: expressionAst[0].start,
        end: expressionAst[1].end,
        pos: expressionAst[0].pos,
        children: [
            ...[].concat(...binaryExpressions?.map(e => cstToAst(e)) ?? []),
            ...children.QuestionMark?.map(e => cstToAst(e, 'questionMark')) ?? [],
            expressionAst[0],
            ...children.Colon?.map(e => cstToAst(e, 'colonToken')) ?? [],
            expressionAst[1]
        ]
    }
}
