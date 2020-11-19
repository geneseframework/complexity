import { cstToAst } from '../cst-to-ast';
import { LocalVariableType } from '../models/local-variable-type.model';
import { LocalVariableTypeChildren } from '../models/local-variable-type-children.model';

// @ts-ignore
export function run(cstNode: LocalVariableType, children: LocalVariableTypeChildren): any {
    return [
        ...[].concat(...children.unannType?.map(e => cstToAst(e)) ?? [])
    ];
}
