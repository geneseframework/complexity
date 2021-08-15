import { cstToAst } from '../cst-to-ast';
import { Catches } from '../models/catches.model';
import { CatchesChildren } from '../models/catches-children';

// @ts-ignore
export function run(cstNode: Catches, children: CatchesChildren) {
    const catchClause = children.catchClause;
    return [
        ...[].concat(...(catchClause.map((e) => cstToAst(e)) ?? []))
    ];

}
