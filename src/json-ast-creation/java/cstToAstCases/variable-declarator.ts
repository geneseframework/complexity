import { cstToAst } from '../cst-to-ast';
import { VariableDeclarator } from '../models/variable.declarator.model';
import { VariableDeclaratorChildren } from '../models/variable-declarator.children.model';

// @ts-ignore
export function run(cstNode: VariableDeclarator, children: VariableDeclaratorChildren): any {
    const variableDeclaratorId = children.variableDeclaratorId;
    const variableInitializer = children.variableInitializer;
    
    return {
        kind: 'VariableDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...[].concat(...variableDeclaratorId?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...variableInitializer?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
