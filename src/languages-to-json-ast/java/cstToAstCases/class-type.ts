import { cstToAst } from '../cst-to-ast';
import { ClassType } from '../models/class-type.model';
import { ClassTypeChildren } from '../models/class-type-children.model';

// @ts-ignore
export function run(cstNode: ClassType, children: ClassTypeChildren): any {
    const identifier = children.Identifier;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    ];
}
