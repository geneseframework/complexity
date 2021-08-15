import { cstToAst } from '../cst-to-ast';
import { SwitchCase } from '../models/switch-case.model';
import { SwitchCaseChildren } from '../models/switch-case-children.model';

// @ts-ignore
export function run(cstNode: SwitchCase, children: SwitchCaseChildren): any {
    const blockStatements = children.blockStatements;
    const switchLabels = children.switchLabel;
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset + 1,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...blockStatements?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...switchLabels?.map(e => cstToAst(e)) ?? [])
        ]
    };
}
