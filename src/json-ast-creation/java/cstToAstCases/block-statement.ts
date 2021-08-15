import { cstToAst } from '../cst-to-ast';
import { BlockStatement } from '../models/block-statement.model';
import { BlockStatementChildren } from '../models/block-statement-children.model';

// @ts-ignore
export function run(cstNode: BlockStatement, children: BlockStatementChildren): any {
    return [
        ...[].concat(...children.statement?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...children.localVariableDeclarationStatement?.map(e => cstToAst(e)) ?? [])
    ];
}
