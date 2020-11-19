import { cstToAst } from '../cst-to-ast';
import { UnannClassOrInterfaceType } from '../models/unann-class-or-interface-type.model';
import { UnannClassOrInterfaceTypeChildren } from '../models/unann-class-or-interface-type-children.model';

// @ts-ignore
export function run(cstNode: UnannClassOrInterfaceType, children: UnannClassOrInterfaceTypeChildren): any {
    const unannClassType = children.unannClassType;

    return [
        ...[].concat(...unannClassType?.map(e => cstToAst(e)) ?? []),
    ];
}
