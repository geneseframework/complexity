import { cstToAst } from '../cst-to-ast';
import { ExplicitConstructorInvocation } from '../models/explicit-constructor-invocation';
import { ExplicitConstructorInvocationChildren } from '../models/explicit-constructor-invocation-children';

// @ts-ignore
export function run(cstNode: ExplicitConstructorInvocation, children: ExplicitConstructorInvocationChildren): any {
    const unqualifiedExplicitConstructorInvocation = children.unqualifiedExplicitConstructorInvocation;

    return [
        ...[].concat(...unqualifiedExplicitConstructorInvocation?.map(e => cstToAst(e)) ?? [])
    ];
}
