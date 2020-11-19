import { cstToAst } from '../cst-to-ast';
import { NumericType } from '../models/numeric-type.model';
import { NumericTypeChildren } from '../models/numeric-type-children.model';

// @ts-ignore
export function run(cstNode: NumericType, children: NumericTypeChildren): any {
    const integralType = children.integralType;
    const floatingPointType = children.floatingPointType;

    return [
        ...[].concat(...integralType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...floatingPointType?.map(e => cstToAst(e)) ?? []),
    ];
}
