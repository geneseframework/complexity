import { cstToAst } from '../cst-to-ast';
import { FormalParameter } from '../models/formal-parameter.model';
import { FormalParameterChildren } from '../models/formal-parameter-children.model';

// @ts-ignore
export function run(cstNode: FormalParameter, children: FormalParameterChildren): any {
    const variableParaRegularParameter = children.variableParaRegularParameter;

    return {
        kind: 'Parameter',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...variableParaRegularParameter?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
