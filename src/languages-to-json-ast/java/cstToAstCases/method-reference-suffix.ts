import { cstToAst } from '../cst-to-ast';
import { MethodReferenceSuffix } from '../models/method-reference-suffix.model';
import { MethodReferenceSuffixChildren } from '../models/method-reference-suffix-children.model';

// @ts-ignore
export function run(cstNode: MethodReferenceSuffix, children: MethodReferenceSuffixChildren): any {
    const identifier = children.Identifier;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    ];
}
