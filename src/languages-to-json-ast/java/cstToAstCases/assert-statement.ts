import { cstToAst } from '../cst-to-ast';
import { AssertStatement } from '../models/assert-statement.model';
import { AssertStatementChildren } from '../models/assert-statement-children.model';
import { Expression } from '../models/expression.model';

// @ts-ignore
export function run(cstNode: AssertStatement, children: AssertStatementChildren): any {
    const expression = children.expression;
    
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...generateAssertStatement(expression)
        ]
    };
}

/**
 * Generate Ast nodes for Assert Statement
 * @param  {Expression[]} expression
 * @returns any
 */
function generateAssertStatement(expression: Expression[]): any{
    const assertAst = [];
    if(Array.isArray(expression) && expression.length > 0) {
        assertAst.push( 
            {
                kind: 'IfStatement',
                start: expression[0].location.startOffset,
                end: expression[0].location.endOffset,
                pos: expression[0].location.startOffset,
                children: [
                    ...[].concat(...[expression[0]]?.map(e => cstToAst(e)) ?? [])
                ]
            });

        if(expression[1]) {
            assertAst.push({
                kind: 'ThrowStatement',
                start: expression[1].location.startOffset,
                end: expression[1].location.endOffset,
                pos: expression[1].location.startOffset,
                children: [
                    ...[].concat(...[expression[1]]?.map(e => cstToAst(e)) ?? [])
                ]
            });
        }
    }
    return assertAst;
}
