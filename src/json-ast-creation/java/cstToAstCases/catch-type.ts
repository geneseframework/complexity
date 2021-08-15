import { cstToAst } from '../cst-to-ast';
import { CatchType } from '../models/catch-type.model';
import { CatchTypeChildren } from '../models/catch-type-children.model';

// @ts-ignore
export function run(cstNode: CatchType, children: CatchTypeChildren) {
    const unannClassType = children.unannClassType;
    return [
        ...[].concat(...(unannClassType.map((e) => cstToAst(e)) ?? []))
    ];
}
