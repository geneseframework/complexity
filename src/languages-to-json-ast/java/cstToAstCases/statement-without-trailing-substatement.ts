import { cstToAst } from '../cst-to-ast';
import { StatementWithoutTrailingSubstatement } from '../models/statement-without-trailing-sub-statement.model';
import { StatementWithoutTrailingSubstatementChildren } from '../models/statement-without-trailing-substatement-children.model';

// @ts-ignore
export function run(cstNode: StatementWithoutTrailingSubstatement, children: StatementWithoutTrailingSubstatementChildren): any {
    const block = children.block;
    const returnStatement = children.returnStatement;
    const switchStatement = children.switchStatement;
    const expressionStatement = children.expressionStatement;
    const doStatement = children.doStatement;
    const tryStatement = children.tryStatement;
    const throwStatement = children.throwStatement;
    const assertStatement = children.assertStatement;
    
    return [
        ...block?.map(e => cstToAst(e)) ?? [],
        ...returnStatement?.map(e => cstToAst(e)) ?? [],
        ...switchStatement?.map(e => cstToAst(e)) ?? [],
        ...expressionStatement?.map(e => cstToAst(e)) ?? [],
        ...doStatement?.map(e => cstToAst(e)) ?? [],
        ...tryStatement?.map(e => cstToAst(e)) ?? [],
        ...throwStatement?.map(e => cstToAst(e)) ?? [],
        ...assertStatement?.map(e => cstToAst(e)) ?? [],
    ];
}
