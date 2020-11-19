import { cstToAst } from '../cst-to-ast';
import { VariableInitializerList } from '../models/variable-initializer-list.model';
import { VariableInitializerListChildren } from '../models/variable-initializer-list-children.model';

// @ts-ignore
export function run(cstNode: VariableInitializerList, children: VariableInitializerListChildren): any {
    const variableInitializer = children.variableInitializer;

    return [
        ...[].concat(...variableInitializer?.map(e => cstToAst(e)) ?? [])
    ];
}
