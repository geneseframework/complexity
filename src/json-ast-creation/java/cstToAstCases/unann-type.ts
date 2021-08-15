import { cstToAst } from '../cst-to-ast';
import { UnannType } from '../models/unann-type.model';
import { UnannTypeChildren } from '../models/unann-type-children.model';

// @ts-ignore
export function run(cstNode: UnannType, children: UnannTypeChildren): any {
    const unannPrimitiveType = children.unannPrimitiveType;
    const unannReferenceType = children.unannReferenceType;
    
    return [
        ...[].concat(...unannPrimitiveType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...unannReferenceType?.map(e => cstToAst(e)) ?? [])
    ];
}
