import {
    Block,
    Identifier,
    IfStatement,
    Node,
    ParameterDeclaration,
    SyntaxKind,
    TransformTraversalControl,
    ts, VariableDeclaration
} from 'ts-morph';

import { Input } from '../models/input.model';
import { Refactorer } from '../models/refactorer.model';
import { RefactorerUtils } from '../utils/refactorer.utils';

export class BigIfElseRefactorer extends Refactorer {
    REFACTORED_NODE_KIND = SyntaxKind.MethodDeclaration;

    refactorNeeded(node: Node): boolean {
        const IF_STATEMENTS = node.getDescendantsOfKind(SyntaxKind.IfStatement);
        return IF_STATEMENTS.some((i: IfStatement) => {
            const BLOCKS = i.getDescendantsOfKind(SyntaxKind.Block);
            return BLOCKS.some((b: Block) => b.compilerNode.statements.length > 5);
        });
    }

    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    refactor(node: Node): Node {
        let methods = [];
        let parameters: Input[] = [];
        let inputs: Input[] = [];
        const NODE = node.transform((traversal: TransformTraversalControl) => {
            let currentNode: Node = Refactorer.wrapCurrentNode(node, traversal);
            this.catchInputs(currentNode, inputs);
            if (this.isConditionnedBlock(currentNode)) {
                currentNode.getDescendantsOfKind(SyntaxKind.VariableStatement).forEach((s) => {
                    const IDENTIFIER: string = s.getFirstDescendantByKind(SyntaxKind.Identifier).getFullText();
                    inputs = inputs.filter((i) => i.identifier !== IDENTIFIER);
                });

                this.keepOnlyParameters(currentNode, inputs, parameters);

                const METHOD_NAME = `methodToRename${methods.length}`;
                const PARAMETERS = parameters.map(({ identifier, type }) => RefactorerUtils.createSimpleParameter(identifier, type));
                const NEW_METHOD = RefactorerUtils.createSimpleMethod(METHOD_NAME, currentNode.compilerNode, PARAMETERS);
                methods.push(NEW_METHOD);

                const CONTAIN_RETURN = currentNode.compilerNode.statements.find((s) => s.kind === ts.SyntaxKind.ReturnStatement);
                const METHOD_CALL: any = RefactorerUtils.createMethodCall(METHOD_NAME, []);

                return ts.createBlock(CONTAIN_RETURN ? [ts.createReturn(METHOD_CALL)] : [METHOD_CALL]);
            }
            return currentNode.compilerNode;
        });

        this.addMethodToClass(NODE, methods);
        return NODE;
    }

    private addMethodToClass(node: Node, methods): void {
        this.addTransformer({
            baseNode: node,
            nodeMethod: 'getParent',
            transformer: (traversal: TransformTraversalControl) => {
                const NODE = traversal.visitChildren();
                if (ts.isClassDeclaration(NODE)) {
                    const METHODS = ts.createNodeArray([...NODE.members, ...methods]);
                    return ts.createClassDeclaration([], [], NODE.name, [], [], METHODS);
                }
                return NODE;
            },
        });
    }

    private keepOnlyParameters(node: Node, inputs: Input[], parameters: Input[]): void {
        node.getDescendantsOfKind(SyntaxKind.Identifier).forEach((d: Identifier) => {
            inputs.forEach((i: Input) => {
                if (i.identifier === d.getFullText() && !parameters.includes(i)) parameters.push(i);
            });
        });
    }

    private catchInputs(node: Node, inputs: Input[]): void {
        if (this.isInputs(node)) {
            const IDENTIFIER: string = node.getFirstDescendantByKind(SyntaxKind.Identifier).getFullText();
            const TYPE: ts.TypeNode = node?.compilerNode.type;
            if (!inputs.find((i) => i.identifier === IDENTIFIER)) inputs.push({ identifier: IDENTIFIER, type: TYPE, isParameter: false });
        }
    }

    private isConditionnedBlock(node: Node): node is Block {
        return node.getParent() && Node.isIfStatement(node.getParent()) && Node.isBlock(node) && node.getStatements().length > 5;
    }

    private isInputs(node: Node): node is ParameterDeclaration | VariableDeclaration {
        return (Node.isParameterDeclaration(node) && !Node.isArrowFunction(node.getParent())) || Node.isVariableDeclaration(node);
    }
}
