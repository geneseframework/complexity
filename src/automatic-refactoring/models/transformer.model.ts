import { Node, TransformTraversalControl, ts } from 'ts-morph';

export class Transformer {
    baseNode: Node;
    nodeMethod: string;
    transformer: (traversal: TransformTraversalControl) => ts.Node;
}
