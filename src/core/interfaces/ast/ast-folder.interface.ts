import { AstFileInterface } from './ast-file.interface';

export interface AstFolderInterface {

    astFiles: AstFileInterface[];
    children?: AstFolderInterface[];
    path: string;

}
