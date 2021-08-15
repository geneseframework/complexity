import { cstToAst } from '../cst-to-ast';
import { TypeArguments } from '../models/type-arguments.model';
import { TypeArgumentsChildren } from '../models/type-arguments-children.model';

// @ts-ignore
export function run(cstNode: TypeArguments, children: TypeArgumentsChildren): any {
    const typeArgumentList = children.typeArgumentList;

    return [
        ...[].concat(...typeArgumentList?.map(e => cstToAst(e)) ?? [])
    ];
}
