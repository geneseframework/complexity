import { Node, SyntaxKind, TransformTraversalControl, ts } from 'ts-morph';

import { Refactorer } from '../models/refactorer.model';

export class UselessElseRefactorer extends Refactorer {
    REFACTORED_NODE_KIND: SyntaxKind = SyntaxKind.MethodDeclaration;

    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @returns {void}
     * @param node
     */
    refactorNeeded(node: Node): boolean {
        const FIRST_BLOCK = node.getFirstChildByKind(SyntaxKind.Block);
        const IF_STATEMENT = FIRST_BLOCK?.getChildrenOfKind(SyntaxKind.IfStatement)[0];
        const HAS_ELSE_STATEMENT = IF_STATEMENT?.getChildrenOfKind(SyntaxKind.Block)?.length === 2;
        const HAS_RETURN_ON_IF = IF_STATEMENT?.getFirstChildByKind(SyntaxKind.Block)?.getFirstChildByKind(SyntaxKind.ReturnStatement);
        return Boolean(IF_STATEMENT && HAS_ELSE_STATEMENT && HAS_RETURN_ON_IF);
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @returns {void}
     * @param node
     */
    refactor(node: Node): Node {
        let elseStatements: string[] = [];
        node.transform((traversal: TransformTraversalControl) => {
            const currentNode = Refactorer.wrapCurrentNode(node, traversal);
            if (Node.isIfStatement(currentNode) && currentNode.getElseStatement()) {
                elseStatements = currentNode.getElseStatement().getChildren().map(s => s.getFullText())
                elseStatements = elseStatements.slice(1, elseStatements.length - 1);
                if (elseStatements[0]) elseStatements[0] = elseStatements[0].replace(/\n/, '');
                return ts.createIf(currentNode.getExpression().compilerNode, currentNode.getThenStatement().compilerNode);
            }
            return currentNode.compilerNode;
        });
        node.getFirstDescendantByKind(SyntaxKind.Block)?.addStatements(elseStatements);
        return node;
    }
}
