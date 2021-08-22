import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import { AstModel } from '../core/models/ast/ast.model';
import * as chalk from 'chalk';
import { Metric } from '../core/models/report/metric.model';
import { ReportModel } from '../core/models/report/report.model';
import { METRIC_SERVICES } from './metrics/const/metrics-list.const';
import { AstFolder } from '../core/models/ast/ast-folder.model';
import { AstFile } from '../core/models/ast/ast-file.model';
import { ReportSnippet } from '../core/models/report/report-snippet.model';

export class EvaluationService {

    static evaluate(astModel: AstModel): JsonReportInterface {
        const reportModel = new ReportModel(astModel.metrics);
        for (const metric of reportModel.metrics) {
            this.evaluateAstFolderForMetric(astModel.astFolder, reportModel, metric);
        }
        return reportModel;
    }

    private static evaluateAstFolderForMetric(astFolder: AstFolder, reportModel: ReportModel, metric: Metric): void {
        try {
            for (const astFile of astFolder.astFiles) {
                const reportSnippet = new ReportSnippet(astFile.name, astFile.code, metric.name);
                this.evaluateAstFileForMetric(astFile, reportSnippet, metric);
                console.log(chalk.greenBright('REPORT SNIPPET'), reportSnippet);
                reportModel.codeSnippets.push(reportSnippet);
            }
        } catch (err) {
            console.log(chalk.redBright('METRIC NOT FOUND'), err);
        }
    }

    private static evaluateAstFileForMetric(astFile: AstFile, reportFile: ReportSnippet, metric: Metric): void {
        METRIC_SERVICES[metric.id].evaluate(astFile, reportFile);
    }
}
