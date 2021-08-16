import { JsonAstFileInterface } from './json-ast-file.interface';

export interface JsonAstFolderInterface {

    astFiles: JsonAstFileInterface[];
    children?: JsonAstFolderInterface[];
    path: string;

}
