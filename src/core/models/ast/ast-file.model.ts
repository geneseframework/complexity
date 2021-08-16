import { AstNode } from './ast-node.model';
import { AstMethod } from './ast-method.model';
import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';

export class AstFile {

    astMethods: AstMethod[] = [];
    astNode: AstNode = undefined;
    code: string = undefined;
    jsonAstFile: JsonAstFileInterface = undefined;
    name: string = undefined;

    constructor(jsonAstFile: JsonAstFileInterface) {
        this.jsonAstFile = jsonAstFile;
    }

}
