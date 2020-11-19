import { cstToAst } from '../cst-to-ast';
import { ArrayInitializer } from '../models/array-initializer.model';
import { ArrayInitializerChildren } from '../models/array-initializer-children.model';

// @ts-ignore
export function run(cstNode: ArrayInitializer, children: ArrayInitializerChildren): any {
    const variableInitializerList = children.variableInitializerList;

    return {
        kind: 'ArrayLiteralExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...variableInitializerList?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
