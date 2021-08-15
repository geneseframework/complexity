import { cstToAst } from '../cst-to-ast';
import { CatchFormalParameterChildren } from '../models/catch-formal-parameter-children.model';
import { CatchFormalParameter } from '../models/catch-formal-parameter.model';

// @ts-ignore
export function run(cstNode: CatchFormalParameter, children: CatchFormalParameterChildren) {
    const variableDeclaratorId = children.variableDeclaratorId;
    return [
        ...[].concat(...(variableDeclaratorId.map((e) => cstToAst(e)) ?? []))
    ];
}
