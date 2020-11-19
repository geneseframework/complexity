import { cstToAst } from '../cst-to-ast';
import { FloatingPointType } from '../models/floating-point-type.model';
import { FloatingPointTypeChildren } from '../models/floating-point-type-children.model';

// @ts-ignore
export function run(cstNode: FloatingPointType, children: FloatingPointTypeChildren): any {
    const double = children.Double;
    const float = children.Float;

    return [
        ...[].concat(double?.map(e => cstToAst(e, 'double')) ?? []),
        ...[].concat(float?.map(e => cstToAst(e, 'float')) ?? [])
    ];
}
