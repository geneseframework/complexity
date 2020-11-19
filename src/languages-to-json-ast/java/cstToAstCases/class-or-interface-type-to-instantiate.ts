import { cstToAst } from '../cst-to-ast';
import { ClassOrInterfaceTypeToInstanciateChildren } from '../models/class-or-interface-type-to-instantiate-children.model';
import { ClassOrInterfaceTypeToInstanciate } from '../models/class-or-interface-type-to-instantiate.model';

// @ts-ignore
export function run(cstNode: ClassOrInterfaceTypeToInstanciate, children: ClassOrInterfaceTypeToInstanciateChildren): any {
    const identifier = children.Identifier;

    return [...identifier.map(e => cstToAst(e, 'identifier'))]
}
