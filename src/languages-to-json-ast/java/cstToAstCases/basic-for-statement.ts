import { cstToAst } from '../cst-to-ast';
import { BasicForStatement } from '../models/basic-for-statement.model';
import { BasicForStatementChildren } from '../models/basic-for-statement-children.model';

// @ts-ignore
export function run(cstNode: BasicForStatement, children: BasicForStatementChildren): any {
    const forInit = children.forInit;
    const expression = children.expression;
    const forUpdate = children.forUpdate;
    const statement = children.statement;

    return [
        ...[].concat(...forInit?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...forUpdate?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...statement?.map(e => cstToAst(e)) ?? [])
    ]
}
