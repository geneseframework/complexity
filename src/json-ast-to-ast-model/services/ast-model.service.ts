import { JsonAstInterface } from '../../core/interfaces/json-ast/json-ast.interface';
import { AstModel } from '../../core/models/ast/ast.model';
import { AstFolderService } from './ast-folder.service';
import * as chalk from 'chalk';

export class AstModelService {

    static generate(jsonAst: JsonAstInterface): AstModel {
        const astModel = new AstModel(jsonAst.metrics);
        astModel.astFolder = AstFolderService.generate(jsonAst.astFolder);
        // console.log(chalk.greenBright('AST MODELLLL = '), astModel);
        return astModel;
    }
}
