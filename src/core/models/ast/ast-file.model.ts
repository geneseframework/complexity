import { AstNode } from './ast-node.model';
import { AstMethod } from './ast-method.model';
import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';

export class AstFile {

    astMethods: AstMethod[] = [];
    astNode: AstNode = undefined;
    jsonAstFile: JsonAstFileInterface = undefined;

    // private _astNode: AstNode = undefined;

    constructor(jsonAstFile: JsonAstFileInterface) {
        this.jsonAstFile = jsonAstFile;
        this.setAstNode();
    }

    get code(): string {
        return this.jsonAstFile.text;
    }

    get name(): string {
        return this.jsonAstFile.name;
    }

    private setAstNode(): void {
        this.astNode = AstNodeService.generate(this.jsonAstFile.astNode);
    }

}
