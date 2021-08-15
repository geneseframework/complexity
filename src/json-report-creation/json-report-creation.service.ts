import { JsonReportInterface } from './interfaces/json-report.interface';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { JsonReport } from './models/json-report.model';
import * as chalk from 'chalk';
import { AstFolderInterface } from '../core/interfaces/ast/ast-folder.interface';
import { ReportFolderService } from './services/report-folder.service';

export class JsonReportCreationService {

    static async start(jsonAst: JsonAstInterface): Promise<JsonReportInterface> {
        const jsonReport: JsonReportInterface = new JsonReport(jsonAst.metrics);
        jsonReport.folder = ReportFolderService.start(jsonAst.astFolder);
        console.log(chalk.greenBright('JSON REPORTTTTT FOLDER'), jsonReport.folder);
        return jsonReport;
    }
}
