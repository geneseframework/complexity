import { cstToAst } from '../cst-to-ast';
import { ConstructorBodyChildren } from '../models/constructor-body-children.model';
import { ConstructorBody } from '../models/constructor-body.model';

// @ts-ignore
export function run(cstNode: ConstructorBody, children: ConstructorBodyChildren): any {
    const blockStatements = children.blockStatements
    const explicitConstructorInvocation = children.explicitConstructorInvocation;

    return {
        kind: 'Block',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...explicitConstructorInvocation?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...blockStatements?.map(e => cstToAst(e)) ?? []),
        ]
    }
}
