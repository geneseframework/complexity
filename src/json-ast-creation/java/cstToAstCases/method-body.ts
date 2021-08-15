import { cstToAst } from '../cst-to-ast';
import { MethodBody } from '../models/method-body.model';
import { MethodBodyChildren } from '../models/method-body-children.model';

// @ts-ignore
export function run(cstNode: MethodBody, children: MethodBodyChildren): any {
    const block = children.block

    return [
        ...[].concat(...block?.map(e => cstToAst(e)) || [])
    ]
}
