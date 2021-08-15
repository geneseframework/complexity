import { cstToAst } from '../cst-to-ast';
import { MethodInvocationSuffix } from '../models/method-invocation-suffix.model';
import { MethodInvocationSuffixChildren } from '../models/method-invocation-suffix-children.model';

// @ts-ignore
export function run(cstNode: MethodInvocationSuffix, children: MethodInvocationSuffixChildren): any {
    const argumentList = children.argumentList;
    
    return {
        kind: 'MethodInvocationSuffix',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...argumentList?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
