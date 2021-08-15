import { cstToAst } from '../cst-to-ast';
import { ExceptionType } from '../models/exception-type.model';
import { ExceptionTypeChildren } from '../models/exception-type-children.model';

// @ts-ignore
export function run(cstNode: ExceptionType, children: ExceptionTypeChildren): any {
    const classType = children.classType;

    return [
        ...[].concat(...classType?.map(e => cstToAst(e)) ?? [])
    ];
}
