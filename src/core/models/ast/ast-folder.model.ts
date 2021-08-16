import { JsonAstFolderInterface } from '../../interfaces/json-ast/json-ast-folder.interface';

export class AstFolder {

    children?: AstFolder[] = [];
    jsonAstFolder: JsonAstFolderInterface = undefined;
    path: string = undefined;

}
