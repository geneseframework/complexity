import { cstToAst } from '../cst-to-ast';
import { IntegralType } from '../models/integral-type.model';
import { IntegralTypeChildren } from '../models/integral-type-children.model';

// @ts-ignore
export function run(cstNode: IntegralType, children: IntegralTypeChildren): any {
    const int = children.Int;
    const byte = children.Byte;
    const long = children.Long;
    const char = children.Char;
    const short = children.Short;

    return [
        ...[].concat(int?.map(e => cstToAst(e, 'int')) ?? []),
        ...[].concat(byte?.map(e => cstToAst(e, 'byte')) ?? []),
        ...[].concat(long?.map(e => cstToAst(e, 'long')) ?? []),
        ...[].concat(char?.map(e => cstToAst(e, 'char')) ?? []),
        ...[].concat(short?.map(e => cstToAst(e, 'short')) ?? []),
    ]
}
