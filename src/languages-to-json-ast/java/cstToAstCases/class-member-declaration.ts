import { cstToAst } from '../cst-to-ast';
import { ClassMemberDeclarationElement } from '../models/class-member-declaration-element.model';
import { ClassMemberDeclarationChildren } from '../models/class-member-declaration-children.model';

// @ts-ignore
export function run(cstNode: ClassMemberDeclarationElement, children: ClassMemberDeclarationChildren): any {
    const methodDeclaration = children.methodDeclaration;

    return [
        ...[].concat(...methodDeclaration?.map(e => cstToAst(e)) || [])
    ]
}
