import { cstToAst } from '../cst-to-ast';
import { PrimarySuffix } from '../models/primary-suffix.model';
import { PrimarySuffixChildren } from '../models/primary-suffix-children.model';

// @ts-ignore
export function run(cstNode: PrimarySuffix, children: PrimarySuffixChildren): any {
    const identifier = children.Identifier;
    const methodInvocationSuffix = children.methodInvocationSuffix;
    const classLiteralSuffix = children.classLiteralSuffix;
    const methodReferenceSuffix = children.methodReferenceSuffix;
    const arrayAccessSuffix = children.arrayAccessSuffix;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? [],
        ...[].concat(...classLiteralSuffix?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...methodInvocationSuffix?.map(e => cstToAst(e, 'methodInvocationSuffix')) ?? []),
        ...[].concat(...methodReferenceSuffix?.map(e => cstToAst(e, 'methodReferenceSuffix')) ?? []),
        ...[].concat(...arrayAccessSuffix?.map(e => cstToAst(e, 'arrayAccessSuffix')) ?? [])
    ];
}
