import { LambdaParameters } from '../models/lambda-parameters.model';
import { LambdaParametersChildren } from '../models/lambda-parameters-children.model';
import { cstToAst } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode: LambdaParameters, children: LambdaParametersChildren) {
    const identifier = children.Identifier;

    return {
        kind: 'Parameter',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
        ]
    } 
}
