import { cstToAst } from '../cst-to-ast';
import { VariableInitializer } from '../models/variable-initializer.model';
import { VariableInitializerChildren } from '../models/variable-initializer-children.model';

// @ts-ignore
export function run(cstNode: VariableInitializer, children: VariableInitializerChildren): any {
    const expression = children.expression;
    const arrayInitializer = children.arrayInitializer;

    return [
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...arrayInitializer?.map(e => cstToAst(e)) ?? [])
    ];
}
