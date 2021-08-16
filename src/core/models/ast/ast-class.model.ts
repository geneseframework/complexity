import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';
import { AstAbstract } from './ast-abstract.model';
import { AstFunction } from './ast-function.model';
import { AstArrowFunction } from './ast-arrow-function.model';

export class AstClass extends AstAbstract {

    astArrowFunctions: AstArrowFunction[] = [];
    astFunctions: AstFunction[] = [];

    constructor(jsonAstNode: JsonAstNodeInterface) {
        super(jsonAstNode);
    }

}
