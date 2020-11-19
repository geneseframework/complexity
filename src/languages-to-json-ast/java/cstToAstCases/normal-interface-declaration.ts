import { cstToAst } from '../cst-to-ast';
import { NormalInterfaceDeclaration } from '../models/normal-interface-declaration.model';
import { NormalInterfaceDeclarationChildren } from '../models/normal-interface-declaration-children.model';

// @ts-ignore
export function run(cstNode: NormalInterfaceDeclaration, children: NormalInterfaceDeclarationChildren): any {
    const typeIdentifier = children.typeIdentifier;
    const interfaceBody = children.interfaceBody;
    
    return [
        ...[].concat(...typeIdentifier.map(e => cstToAst(e))),
        ...[].concat(...interfaceBody.map(e => cstToAst(e))),
    ]
}
