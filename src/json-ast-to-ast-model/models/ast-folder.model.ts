import { JsonAstFolderInterface } from '../../core/interfaces/json-ast/json-ast-folder.interface';
import { AstFile } from './ast-file.model';

export class AstFolder {

    astFiles: AstFile[] = [];
    children?: AstFolder[] = [];
    jsonAstFolder: JsonAstFolderInterface = undefined;

    constructor(jsonAstFolder: JsonAstFolderInterface) {
        this.jsonAstFolder = jsonAstFolder;
    }

    get path(): string {
        return this.jsonAstFolder.path;
    }
}
