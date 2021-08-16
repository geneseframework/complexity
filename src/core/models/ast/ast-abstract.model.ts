import { AstNode } from './ast-node.model';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';
import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';

export abstract class AstAbstract {

    astNode: AstNode = undefined;
    jsonAstNode: JsonAstNodeInterface = undefined;

    protected constructor(jsonAstNode: JsonAstNodeInterface) {
        this.jsonAstNode = jsonAstNode;
        this.setAstNode();
    }

    get code(): string {
        return this.astNode.code;
    }

    get name(): string {
        return this.jsonAstNode.name;
    }

    private setAstNode(): void {
        this.astNode = AstNodeService.generate(this.jsonAstNode);
    }
}
