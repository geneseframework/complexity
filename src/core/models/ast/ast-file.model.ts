import { AstNode } from './ast-node.model';
import { AstMethod } from './ast-method.model';
import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';
import { AstMethodService } from '../../../json-ast-to-ast-model/services/ast-method.service';
import { FunctionInterface } from '../../interfaces/ast/function.interface';
import { AstFunctionInterfaceService } from '../../../json-ast-to-ast-model/services/ast-function-interface.service';

export class AstFile {

    // astMethods: AstMethod[] = [];
    astNode: AstNode = undefined;
    functionInterfaces: FunctionInterface[] = [];
    jsonAstFile: JsonAstFileInterface = undefined;

    // private _astNode: AstNode = undefined;

    constructor(jsonAstFile: JsonAstFileInterface) {
        this.jsonAstFile = jsonAstFile;
        this.setAstNode();
        // this.setAstMethods();
        this.setFunctionInterfaces();
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

    private setFunctionInterfaces(): void {
        this.functionInterfaces = AstFunctionInterfaceService.generate(this);
    }

    // private setAstMethods(): void {
    //     this.astMethods = AstMethodService.generate(this);
    // }

}
