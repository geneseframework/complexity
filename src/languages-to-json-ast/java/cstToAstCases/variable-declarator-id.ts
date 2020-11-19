import { cstToAst } from '../cst-to-ast';
import { VariableDeclaratorId } from '../models/variable-declarator-id.model';
import { VariableDeclaratorIdChildren } from '../models/variable-declarator-id-children.model';

// @ts-ignore
export function run(cstNode: VariableDeclaratorId, children: VariableDeclaratorIdChildren): any {
    const identifier = children.Identifier;

    return [
        ...identifier.map(e => cstToAst(e, 'identifier'))
    ];
}
