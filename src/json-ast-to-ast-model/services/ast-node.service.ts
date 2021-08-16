import { AstNode } from '../../core/models/ast/ast-node.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';

export class AstNodeService {

    static generate(jsonAstNode: JsonAstNodeInterface): AstNode {
        const astNode = new AstNode(jsonAstNode);
        return astNode;
    }
}
