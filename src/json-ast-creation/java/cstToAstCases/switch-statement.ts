import { cstToAst } from '../cst-to-ast';
import { SwitchStatement } from '../models/switch-statement.model';
import { SwitchStatementChildren } from '../models/switch-statement-children.model';

// @ts-ignore
export function run(cstNode: SwitchStatement, children: SwitchStatementChildren): any {
    const expression = children.expression;
    const switchBlock = children.switchBlock;

    return {
        kind: 'SwitchStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...expression.map(e => cstToAst(e)) ?? []),
            ...[].concat(...switchBlock.map(e => cstToAst(e)) ?? [])
        ]
    };
}
