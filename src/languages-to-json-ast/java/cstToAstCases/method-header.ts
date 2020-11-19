import { cstToAst } from '../cst-to-ast';
import { MethodHeader } from '../models/method-header.model';
import { MethodHeaderChildren } from '../models/method-header-children.model';

// @ts-ignore
export function run(cstNode: MethodHeader, children: MethodHeaderChildren): any {
    const result = children.result;
    const methodDeclarator = children.methodDeclarator;
    const throws = children.throws;
    return [
        ...[].concat(...result?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...methodDeclarator?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...throws?.map(e => cstToAst(e)) ?? [])
    ];
}
