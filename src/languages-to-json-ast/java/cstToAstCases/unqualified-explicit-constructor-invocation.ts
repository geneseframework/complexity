import { cstToAst } from '../cst-to-ast';
import { UnqualifiedExplicitConstructorInvocation } from '../models/unqualified-explicit-constructor-invocation';
import { UnqualifiedExplicitConstructorInvocationChildren } from '../models/unqualified-explicit-constructor-invocation-children';

// @ts-ignore
export function run(cstNode: UnqualifiedExplicitConstructorInvocation, children: UnqualifiedExplicitConstructorInvocationChildren): any {
    const Super = children.Super;
    const argumentList = children.argumentList;
    const superAst = Super?.map(e => cstToAst(e, 'super'))[0] ?? undefined;
    if (superAst) superAst.type = 'function';

    return {
        kind: 'CallExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            superAst,
            ...[].concat(...argumentList?.map(e => cstToAst(e)) ?? []),
        ].filter(e => e)
    };
}
