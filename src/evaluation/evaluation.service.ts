import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import { AstModel } from '../core/models/ast/ast.model';
import * as chalk from 'chalk';
import { Metric } from '../core/models/report/metric.model';
import { ReportModel } from '../core/models/report/report.model';
import { METRIC_SERVICES } from './metrics/const/metrics-list.const';
import { AstFolder } from '../core/models/ast/ast-folder.model';
import { AstFile } from '../core/models/ast/ast-file.model';
import { ReportFolder } from '../core/models/report/report-folder.model';
import { ReportFile } from '../core/models/report/report-file.model';

export class EvaluationService {

    static evaluate(astModel: AstModel): JsonReportInterface {
        // console.log(chalk.magentaBright('EVAL SERVICEEEEE'), astModel);
        const reportModel = new ReportModel(astModel.metrics);
        for (const metric of reportModel.metrics) {
            this.evaluateAstFolderForMetric(astModel.astFolder, reportModel, metric);
        }
        return reportModel;
    }

    private static evaluateAstFolderForMetric(astFolder: AstFolder, reportModel: ReportModel, metric: Metric): void {
        try {
            reportModel.folder = new ReportFolder(astFolder.path);
            for (const astFile of astFolder.astFiles) {
                const reportFile = new ReportFile(astFile.name, astFile.code, metric.name);
                this.evaluateAstFileForMetric(astFile, reportFile, metric);
                reportModel.folder.files.push(reportFile);
            }
        } catch (err) {
            console.log(chalk.redBright('METRIC NOT FOUND'), err);
        }
    }

    private static evaluateAstFileForMetric(astFile: AstFile, reportFile: ReportFile, metric: Metric): void {
        METRIC_SERVICES[metric.id].evaluate(astFile, reportFile);
    }
}
