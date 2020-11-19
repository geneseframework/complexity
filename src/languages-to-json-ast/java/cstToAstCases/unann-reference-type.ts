import { cstToAst } from '../cst-to-ast';
import { UnannReferenceType } from '../models/unann-reference-type.model';
import { UnannReferenceTypeChildren } from '../models/unann-reference-type-children.model';

// @ts-ignore
export function run(cstNode: UnannReferenceType, children: UnannReferenceTypeChildren): any {
    const unannClassOrInterfaceType = children.unannClassOrInterfaceType;

    return [
        ...[].concat(...unannClassOrInterfaceType?.map(e => cstToAst(e)) ?? []),
    ];
}
