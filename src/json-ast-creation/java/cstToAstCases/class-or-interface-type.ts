import { cstToAst } from '../cst-to-ast';
import { ClassOrInterfaceType } from '../models/class-or-interface-type.model';
import { ClassOrInterfaceTypeChildren } from '../models/class-or-interface-type-children.model';

// @ts-ignore
export function run(cstNode: ClassOrInterfaceType, children: ClassOrInterfaceTypeChildren): any {
    const classType = children.classType;

    return [
        ...[].concat(...classType?.map(e => cstToAst(e)) ?? []),
    ];
}
