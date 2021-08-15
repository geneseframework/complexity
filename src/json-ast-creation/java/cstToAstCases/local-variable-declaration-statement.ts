import { cstToAst } from '../cst-to-ast';
import { LocalVariableDeclarationStatement } from '../models/local-variable-declaration-statement.model';
import { LocalVariableDeclarationStatementChildren } from '../models/local-variable-declaration-statement-children.model';

// @ts-ignore
export function run(cstNode: LocalVariableDeclarationStatement, children: LocalVariableDeclarationStatementChildren): any {
    return [
        ...[].concat(...children.localVariableDeclaration?.map(e => cstToAst(e)) ?? [])
    ];
}
