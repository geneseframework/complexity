import { AstNode } from './ast-node.model';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';
import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';
import { AstCode } from './ast-code.model';

export abstract class AstAbstract {

    astCode: AstCode = undefined;
    astNode: AstNode = undefined;
    jsonAstNode: JsonAstNodeInterface = undefined;

    protected constructor(jsonAstNode: JsonAstNodeInterface) {
        this.jsonAstNode = jsonAstNode;
        this.setAstNode();
    }

    get name(): string {
        return this.jsonAstNode.name;
    }

    get text(): string {
        return this.astNode.code;
    }

    private setAstNode(): void {
        this.astNode = AstNodeService.generate(this.jsonAstNode);
    }
}
