import { cstToAst } from '../cst-to-ast';
import { Result } from '../models/result.model';
import { ResultChildren } from '../models/result-children.model';

// @ts-ignore
export function run(cstNode: Result, children: ResultChildren): any {
    const unannType = children.unannType;
    const Void = children.Void;

    return [
        ...[].concat(...unannType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...Void?.map(e => cstToAst(e, 'void')) ?? [])
    ];
}
