import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';

export class ReportModelCreationService {

    static async start(jsonReport: JsonReportInterface): Promise<JsonReportInterface> {
        // const jsonReport: JsonReportInterface = new JsonReport(jsonAst.metrics);
        // jsonReport.folder = ReportFolderService.start(jsonAst.astFolder);
        // console.log(chalk.greenBright('JSON REPORTTTTT FOLDER'), jsonReport.folder);
        // return jsonReport;
        return undefined;
    }
}
