import { cstToAst } from '../cst-to-ast';
import { ExceptionTypeList } from '../models/exception-type-list.model';
import { ExceptionTypeListChildren } from '../models/exception-type-list-children.model';

// @ts-ignore
export function run(cstNode: ExceptionTypeList, children: ExceptionTypeListChildren): any {
    const exceptionType = children.exceptionType;

    return [
        ...[].concat(...exceptionType?.map(e => cstToAst(e)) ?? [])
    ];
}
