import { AstNode } from './ast-node.model';
import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';
import { AstAbstract } from './ast-abstract.model';

export class AstClass extends AstAbstract {


    constructor(jsonAstClass: JsonAstNodeInterface) {
        super(jsonAstClass);
    }

}
