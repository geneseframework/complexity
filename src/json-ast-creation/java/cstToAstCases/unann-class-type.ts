import { cstToAst } from '../cst-to-ast';
import { UnannClassType } from '../models/unann-class-type.model';
import { UnannClassTypeChildren } from '../models/unann-class-type-children.model';

// @ts-ignore
export function run(cstNode: UnannClassType, children: UnannClassTypeChildren): any {
    const identifier = children.Identifier;
    const typeArguments = children.typeArguments;

    return {
        kind: 'TypeReference',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...identifier?.map(e => cstToAst(e, 'identifier')) ?? [],
            ...[].concat(...typeArguments?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
