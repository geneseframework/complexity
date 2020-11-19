import { cstToAst } from '../cst-to-ast';
import { ClassBodyDeclarationElement } from '../models/class-body-declaration-element.model';
import { ClassBodyDeclarationChildren } from '../models/class-body-declaration-children.model';

// @ts-ignore
export function run(cstNode: ClassBodyDeclarationElement, children: ClassBodyDeclarationChildren): any {
    const classMemberDeclaration = children.classMemberDeclaration;
    const constructorDeclaration = children.constructorDeclaration;

    return [
        ...[].concat(...classMemberDeclaration?.map(e => cstToAst(e)) || []),
        ...[].concat(...constructorDeclaration?.map(e => cstToAst(e)) || [])
    ];
}
