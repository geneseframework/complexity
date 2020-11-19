import { cstToAst } from '../cst-to-ast';
import { InterfaceMethodDeclaration } from '../models/interface-method-declaration.model';
import { InterfaceMethodDeclarationChildren } from '../models/interface-method-declaration-children.model';

// @ts-ignore
export function run(cstNode: InterfaceMethodDeclaration, children: InterfaceMethodDeclarationChildren): any {
    const methodHeader = children.methodHeader;
    const methodBody = children.methodBody;

    const methodHeaderAst = methodHeader.map(e => cstToAst(e));

    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        name: getName(methodHeaderAst),
        children: [
            ...[].concat(...methodHeaderAst),
            ...[].concat(...methodBody.map(e => cstToAst(e))),
        ]
    };
}

function getName(methodHeaderAst): string {
    return methodHeaderAst?.[0]?.[1]?.name ?? '';
}
