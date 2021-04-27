import { AstNodeInterface } from '../../../../core/interfaces/ast/ast-node.interface';

export class ArrowFunctionWithIndex {

    arrowFunction: AstNodeInterface;
    index: number;

    constructor(arrowFunction: AstNodeInterface, index: number) {
        this.arrowFunction = arrowFunction;
        this.index = index;
    }
}
