import { cstToAst } from '../cst-to-ast';
import { VariableDeclaratorList } from '../models/variable-declarator-list.model';
import { VariableDeclaratorListChildren } from '../models/variable-declarator-list-children.model';

// @ts-ignore
export function run(cstNode: VariableDeclaratorList, children: VariableDeclaratorListChildren): any {
    return {
        kind: 'VariableDeclarationList',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...[].concat(...children.variableDeclarator?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
