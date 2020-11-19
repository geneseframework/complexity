import { cstToAst } from '../cst-to-ast';
import { StatementExpressionList } from '../models/statement-expression-list.model';
import { StatementExpressionListChildren } from '../models/statement-expression-list-children.model';

// @ts-ignore
export function run(cstNode: StatementExpressionList, children: StatementExpressionListChildren): any {
    const statementExpression = children.statementExpression;

    return [
        ...[].concat(...statementExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
