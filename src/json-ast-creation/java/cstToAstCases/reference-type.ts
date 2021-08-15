import { cstToAst } from '../cst-to-ast';
import { ReferenceType } from '../models/reference-type.model';
import { ReferenceTypeChildren } from '../models/reference-type-children.model';

// @ts-ignore
export function run(cstNode: ReferenceType, children: ReferenceTypeChildren): any {
    const classOrInterfaceType = children.classOrInterfaceType;

    return {
        kind: 'TypeReference',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...classOrInterfaceType?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
