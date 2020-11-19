import { cstToAst } from '../cst-to-ast';
import { InterfaceBody } from '../models/interface-body.model';
import { InterfaceBodyChildren } from '../models/interface-body-children.model';

// @ts-ignore
export function run(cstNode: InterfaceBody, children: InterfaceBodyChildren): any {
    const interfaceMemberDeclaration = children.interfaceMemberDeclaration;
        
    return [
        ...[].concat(...interfaceMemberDeclaration?.map(e => cstToAst(e)) ?? []),
    ]
}
