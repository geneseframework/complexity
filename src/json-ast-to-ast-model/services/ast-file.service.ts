import { JsonAstFileInterface } from '../../core/interfaces/json-ast/json-ast-file.interface';
import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstClassService } from './ast-class.service';
import { AstFunctionService } from './ast-function.service';
import { AstArrowFunctionService } from './ast-arrow-function.service';
import { AstCodeService } from './ast-code.service';
import * as chalk from 'chalk';

export class AstFileService {

    static generate(jsonAstFile: JsonAstFileInterface): AstFile {
        const astFile = new AstFile(jsonAstFile);
        astFile.text = jsonAstFile.text;
        astFile.name = jsonAstFile.name;
        astFile.astClasses = AstClassService.generate(astFile);
        astFile.astFunctions = AstFunctionService.generate(astFile);
        astFile.astArrowFunctions = AstArrowFunctionService.generate(astFile);
        astFile.astCode = AstCodeService.generate(astFile);
        // console.log(chalk.greenBright('AST CODEEEEEEE lines'), astFile.lines.map(l => l.text));
        // console.log(chalk.magentaBright('AST CODEEEEEEE code'), astFile.code);
        astFile.astCode.logg();
        // console.log(chalk.magentaBright('AST FILEEEE CODE = '), astFile);
        return astFile;
    }
}
