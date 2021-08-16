import { JsonAstFolderInterface } from '../../core/interfaces/json-ast/json-ast-folder.interface';
import { AstFolder } from '../../core/models/ast/ast-folder.model';
import { JsonAstFileInterface } from '../../core/interfaces/json-ast/json-ast-file.interface';
import { AstFileService } from './ast-file.service';

export class AstFolderService {

    static generate(jsonAstFolder: JsonAstFolderInterface): AstFolder {
        const astFolder = new AstFolder(jsonAstFolder);
        this.generateAstFiles(astFolder, jsonAstFolder.astFiles);
        return astFolder;
    }

    private static generateAstFiles(astFolder: AstFolder, jsonAstFiles: JsonAstFileInterface[]): void {
        for (const jsonAstFile of jsonAstFiles) {
            astFolder.astFiles.push(AstFileService.generate(jsonAstFile));
        }
    }
}
