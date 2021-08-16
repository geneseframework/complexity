import { JsonAstInterface } from '../core/interfaces/json-ast/json-ast.interface';
import { AstModel } from '../core/models/ast/ast.model';

export class AstModelCreationService {

    static async generate(jsonAst: JsonAstInterface): Promise<AstModel> {
        // const jsonReport: JsonReportInterface = new JsonReport(jsonAst.metrics);
        // jsonReport.folder = ReportFolderService.start(jsonAst.astFolder);
        // console.log(chalk.greenBright('JSON REPORTTTTT FOLDER'), jsonReport.folder);
        // return jsonReport;
        return undefined;
    }
}
