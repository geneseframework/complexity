import { cstToAst } from '../cst-to-ast';
import { ForInit } from '../models/for-init.model';
import { ForInitChildren } from '../models/for-init-children.model';

// @ts-ignore
export function run(cstNode: ForInit, children: ForInitChildren): any {
    const localVariableDeclaration = children.localVariableDeclaration;

    return (
        [
            ...[].concat(
                ...(localVariableDeclaration?.map((e) => cstToAst(e)) ?? [])
            ),
        ][0]?.children || []
    );
}
