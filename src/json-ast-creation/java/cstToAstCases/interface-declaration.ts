import { cstToAst } from '../cst-to-ast';
import { InterfaceDeclaration } from '../models/interface-declaration.model';
import { InterfaceDeclarationChildren } from '../models/interface-declaration-children.model';

// @ts-ignore
export function run(cstNode: InterfaceDeclaration, children: InterfaceDeclarationChildren): any {
    const normalInterfaceDeclaration = children.normalInterfaceDeclaration;

    return {
        kind: 'ClassDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...normalInterfaceDeclaration?.map(e => cstToAst(e)) ?? []),
        ]
    };
}
