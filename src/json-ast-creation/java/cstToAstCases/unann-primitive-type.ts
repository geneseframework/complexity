import { cstToAst } from '../cst-to-ast';
import { UnannPrimitiveType } from '../models/unann-primitive-type.model';
import { UnannPrimitiveTypeChildren } from '../models/unann-primitive-type-children.model';

// @ts-ignore
export function run(cstNode: UnannPrimitiveType, children: UnannPrimitiveTypeChildren): any {
    const numericType = children.numericType;

    return [
        ...[].concat(...numericType?.map(e => cstToAst(e)) ?? []),
    ];
}
