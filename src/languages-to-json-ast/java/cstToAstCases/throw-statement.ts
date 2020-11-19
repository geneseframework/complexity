import { cstToAst } from '../cst-to-ast';
import { ThrowStatementElementChildren } from '../models/throw-statement-element-children.model';
import { ThrowStatementElement } from '../models/throw-statement.model';


export function run(cstNode: ThrowStatementElement, children: ThrowStatementElementChildren): any {
    const expression = children.expression;

    return {
        kind: 'ThrowStatement',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
        ]
    };

}
