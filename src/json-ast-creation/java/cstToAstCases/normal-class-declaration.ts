import { cstToAst } from '../cst-to-ast';
import { NormalClassDeclarationElement } from '../models/normal-class-declaration-element.model';
import { NormalClassDeclarationChildren } from '../models/normal-class-declaration-children.model';

// @ts-ignore
export function run(cstNode: NormalClassDeclarationElement, children: NormalClassDeclarationChildren): any {
    const typeIdentifier = children.typeIdentifier;
    const classBody = children.classBody;

    return [
        ...[].concat(...typeIdentifier.map(e => cstToAst(e))),
        ...[].concat(...classBody.map(e => cstToAst(e))),
    ]
}
