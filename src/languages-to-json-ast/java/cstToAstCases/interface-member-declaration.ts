import { cstToAst } from '../cst-to-ast';
import { InterfaceMemberDeclaration } from '../models/interface-member-declaration.model';
import { InterfaceMemberDeclarationChildren } from '../models/interface-member-declaration-children.model';

// @ts-ignore
export function run(cstNode: InterfaceMemberDeclaration, children: InterfaceMemberDeclarationChildren): any {
    const interfaceMethodDeclaration = children.interfaceMethodDeclaration;
    
    return [
        ...[].concat(...interfaceMethodDeclaration?.map(e => cstToAst(e)) || [])
    ];
}
