import { cstToAst } from '../cst-to-ast';
import { VariableParaRegularParameter } from '../models/variable-para-regular-parameter.model';
import { VariableParaRegularParameterChildren } from '../models/variable-para-regular-parameter-children.model';

// @ts-ignore
export function run(cstNode: VariableParaRegularParameter, children: VariableParaRegularParameterChildren): any {
    const unannType = children.unannType;
    const variableDeclaratorId = children.variableDeclaratorId;

    return [
        ...[].concat(...unannType.map(e => cstToAst(e))),
        ...[].concat(...variableDeclaratorId.map(e => cstToAst(e)))
    ];
}
