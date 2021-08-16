import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';
import { AstNode } from './ast-node.model';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';

export abstract class AstAbstract {

    astNode: AstNode = undefined;
    jsonAstNode: JsonAstFileInterface = undefined;

    constructor(jsonAstNode: JsonAstFileInterface) {
        this.jsonAstNode = jsonAstNode;
        this.setAstNode();
    }


    get code(): string {
        return this.jsonAstNode.text;
    }

    get name(): string {
        return this.jsonAstNode.name;
    }

    private setAstNode(): void {
        this.astNode = AstNodeService.generate(this.jsonAstNode.astNode);
    }
}
