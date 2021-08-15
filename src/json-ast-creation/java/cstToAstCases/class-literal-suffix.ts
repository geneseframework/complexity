import { cstToAst } from '../cst-to-ast';
import { ClassLiteralSuffix } from '../models/class-literal-suffix.model';
import { ClassLiteralSuffixChildren } from '../models/class-literal-suffix-children.model';

// @ts-ignore
export function run(cstNode: ClassLiteralSuffix, children: ClassLiteralSuffixChildren): any {
    const class_ = children.Class;
    return {
        kind: 'ClassLiteralSuffix',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...class_?.map(e => cstToAst(e, 'identifier')) ?? [])
        ]
    };
}
