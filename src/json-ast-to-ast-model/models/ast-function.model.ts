import { AstAbstract } from './ast-abstract.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';

export class AstFunction extends AstAbstract {


    constructor(jsonAstNode: JsonAstNodeInterface) {
        super(jsonAstNode);
    }
}
