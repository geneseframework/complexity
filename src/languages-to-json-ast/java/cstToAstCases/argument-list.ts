import { ArgumentList } from '../models/argument-list.model';
import { ArgumentListChildren } from '../models/argument-list-children.model';
import { cstToAst } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode: ArgumentList, children: ArgumentListChildren): any {
    const expression = children.expression;

    return [
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ];
}
