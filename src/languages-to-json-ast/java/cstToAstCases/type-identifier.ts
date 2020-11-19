import { cstToAst } from '../cst-to-ast';
import { TypeIdentifierElement } from '../models/type-identifier-element.model';
import { TypeIdentifierChildren } from '../models/type-identifier-children.model';

// @ts-ignore
export function run(cstNode: TypeIdentifierElement, children: TypeIdentifierChildren): any {
    const identifier = children.Identifier;

    return [
        ...identifier.map(e => cstToAst(e, 'identifier')),
    ];
}
