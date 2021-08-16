import { JsonAstFileInterface } from '../../core/interfaces/json-ast/json-ast-file.interface';
import { AstFile } from '../../core/models/ast/ast-file.model';
import * as chalk from 'chalk';

export class AstFileService {

    static generate(jsonAstFile: JsonAstFileInterface): AstFile {
        const astFile = new AstFile(jsonAstFile);
        console.log(chalk.magentaBright('AST FILEEEE = '), astFile);
        return astFile;
    }
}
