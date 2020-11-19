import { cstToAst } from '../cst-to-ast';
import { ClassBodyElement } from '../models/class-body-element.model';
import { ClassBodyChildren } from '../models/class-body-children.model';

// @ts-ignore
export function run(cstNode: ClassBodyElement, children: ClassBodyChildren): any {
    const classBodyDeclaration = children.classBodyDeclaration;

    return [
        ...[].concat(...classBodyDeclaration?.map(e => cstToAst(e)) ?? []),
    ]
}
