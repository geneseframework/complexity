import { cstToAst } from '../cst-to-ast';
import { IntegerLiteral } from '../models/integer-literal.model';
import { IntegerLiteralChildren } from '../models/integer-literal-children.model';

// @ts-ignore
export function run(cstNode: IntegerLiteral, children: IntegerLiteralChildren): any {
    const decimalLiteral = children.DecimalLiteral;

    return {
        kind: 'IntegerLiteral',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...decimalLiteral?.map(e => cstToAst(e, 'decimalLiteral')) ?? [])
        ]
    };
}
