import { cstToAst } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode: any, children: any): any {
    const identifier = children.Identifier;

    return [
        ...[].concat(...identifier?.map(e => cstToAst(e, 'identifier')) ?? []),
    ];
}
