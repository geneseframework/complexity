import { JsonAstNodeInterface } from '../../../../core/interfaces/json-ast/json-ast-node.interface';

export class ArrowFunctionWithIndex {

    arrowFunction: JsonAstNodeInterface;
    index: number;

    constructor(arrowFunction: JsonAstNodeInterface, index: number) {
        this.arrowFunction = arrowFunction;
        this.index = index;
    }
}
