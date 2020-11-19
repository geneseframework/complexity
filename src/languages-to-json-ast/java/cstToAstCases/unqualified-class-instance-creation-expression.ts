import { cstToAst } from '../cst-to-ast';
import { UnqualifiedClassInstanceCreationExpression } from '../models/unqualified-class-instance-creation-expression.model';
import { UnqualifiedClassInstanceCreationExpressionChildren } from '../models/unqualified-class-instance-creation-expression-children.model';

// @ts-ignore
export function run(cstNode: UnqualifiedClassInstanceCreationExpression, children: UnqualifiedClassInstanceCreationExpressionChildren): any {
    const argumentList = children.argumentList;
    const classOrInterfaceTypeToInstantiate = children.classOrInterfaceTypeToInstantiate;
    const classBody = children.classBody;

    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...classOrInterfaceTypeToInstantiate?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...argumentList?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...classBody?.map(e => cstToAst(e)) ?? [])
        ]
    }

}


