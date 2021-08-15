import { cstToAst } from '../cst-to-ast';
import { FormalParameterList } from '../models/formal-parameter-list.model';
import { FormalParameterListChildren } from '../models/formal-parameter-list-children.model';

// @ts-ignore
export function run(cstNode: FormalParameterList, children: FormalParameterListChildren): any {
    const formalParameter = children.formalParameter;

    return [
        ...formalParameter.map(e => cstToAst(e))
    ]
}
