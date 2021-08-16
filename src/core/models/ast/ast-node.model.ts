import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';

export class AstNode {

    jsonAstNode: JsonAstNodeInterface = undefined;

    constructor(jsonAstNode: JsonAstNodeInterface) {
        this.jsonAstNode = jsonAstNode;
    }
}
