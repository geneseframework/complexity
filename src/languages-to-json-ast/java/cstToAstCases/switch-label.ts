import { cstToAst } from '../cst-to-ast';
import { SwitchLabel } from '../models/switch-label.model';
import { SwitchLabelChildren } from '../models/switch-label-children.model';

// @ts-ignore
export function run(cstNode: SwitchLabel, children: SwitchLabelChildren): any {
    const constantExpressions = children.constantExpression;

    return [
        ...[].concat(...constantExpressions?.map(e => cstToAst(e)) ?? []),
    ];
}
