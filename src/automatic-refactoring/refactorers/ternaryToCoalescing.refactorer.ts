import { ConditionalExpression, Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Refactorer } from '../models/refactorer.model';

export class TernaryToNullishCoalescing extends Refactorer {
    REFACTORED_NODE_KIND = SyntaxKind.MethodDeclaration;

    refactorNeeded(node: Node): boolean {
        let refactorNeeded = false;
        const TERNARY_EXPRESSIONS = node.getDescendantsOfKind(SyntaxKind.ConditionalExpression);
        TERNARY_EXPRESSIONS.forEach((ternary: ConditionalExpression) => {
            const COUNT = ternary.getChildCount();
            if (Node.isConditionalExpression(ternary) && COUNT > 0) {
                const FIRST_MEMBER = ternary.getChildAtIndex(0);
                const SECOND_MEMBER = ternary.getChildAtIndex(2);
                if (FIRST_MEMBER.getText() === SECOND_MEMBER.getText() && FIRST_MEMBER.getKind() === SECOND_MEMBER.getKind()) {
                    refactorNeeded = true;
                }
            }
        });
        return refactorNeeded;
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    refactor(node: Node): Node {
        return node.transform((traversal: TransformTraversalControl) => {
            const currentNode = Refactorer.wrapCurrentNode(node, traversal);
            if (Node.isConditionalExpression(currentNode)) {
                const FIRST_MEMBER = currentNode.getChildAtIndex(0);
                const SECOND_MEMBER = currentNode.getChildAtIndex(2);
                if (FIRST_MEMBER.getText() === SECOND_MEMBER.getText() && FIRST_MEMBER.getKind() === SECOND_MEMBER.getKind()) {
                    const THIRD_MEMBER = currentNode.getChildAtIndex(4);
                    return ts.createBinary(
                        FIRST_MEMBER.compilerNode as ts.Identifier,
                        SyntaxKind.QuestionQuestionToken,
                        THIRD_MEMBER.compilerNode as ts.Identifier
                    );
                }
            }
            return currentNode.compilerNode;
        });
    }
}
