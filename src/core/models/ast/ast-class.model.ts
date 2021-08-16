import { AstNode } from './ast-node.model';
import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';

export class AstClass {

    astNode: AstNode = undefined;

    constructor(jsonAstClass: JsonAstNodeInterface) {
        this.astNode = new AstNode(jsonAstClass);
    }

}
