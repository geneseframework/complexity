import { cstToAst } from '../cst-to-ast';
import { Throws } from '../models/throws.model';
import { ThrowsChildren } from '../models/throws-children.model';

// @ts-ignore
export function run(cstNode: Throws, children: ThrowsChildren): any {
    const exceptionTypeList = children.exceptionTypeList;

    return [
        ...[].concat(...exceptionTypeList?.map(e => cstToAst(e)) ?? [])
    ];
}
