import { cstToAst } from '../cst-to-ast';
import { EnhancedForStatement } from '../models/enhanced-for-statement';
import { EnhancedForStatementChildren } from '../models/enhanced-for-statement-children.model';

// @ts-ignore
export function run(cstNode: EnhancedForStatement, children: EnhancedForStatementChildren): any {
    const localVariableType = children.localVariableType;
    const variableDeclaratorId = children.variableDeclaratorId;
    const expression = children.expression;
    const statement = children.statement;

    return [
        ...[].concat(...localVariableType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...variableDeclaratorId?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...statement?.map(e => cstToAst(e)) ?? [])
    ]
}
