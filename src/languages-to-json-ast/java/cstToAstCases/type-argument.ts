import { cstToAst } from '../cst-to-ast';
import { TypeArgumentChildren } from '../models/type-argument-children.model';
import { TypeArgument } from '../models/type-argument.model';

// @ts-ignore
export function run(cstNode: TypeArgument, children: TypeArgumentChildren): any {
    const referenceType = children.referenceType;

    return [
        ...[].concat(...referenceType?.map(e => cstToAst(e)) ?? [])
    ];
}
