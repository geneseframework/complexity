import { cstToAst } from '../cst-to-ast';
import { Statement } from '../models/statement.model';
import { StatementChildren } from '../models/statement-children.model';

// @ts-ignore
export function run(cstNode: Statement, children: StatementChildren): any {
    const statementWithoutTrailingSubstatement = children.statementWithoutTrailingSubstatement;
    const ifStatement = children.ifStatement;
    const whileStatement = children.whileStatement;
    const forStatement = children.forStatement;

    return [
        ...[].concat(...statementWithoutTrailingSubstatement?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...ifStatement?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...forStatement?.map(e => cstToAst(e)) ?? []),
        ...whileStatement?.map(e => cstToAst(e)) ?? [],
    ];
}
