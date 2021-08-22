import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import { AstModel } from '../json-ast-to-ast-model/models/ast.model';
import * as chalk from 'chalk';
import { Metric } from '../core/models/metric.model';
import { ReportModel } from '../report/models/report.model';
import { METRIC_SERVICES } from './metrics/const/metrics-list.const';
import { AstFile } from '../json-ast-to-ast-model/models/ast-file.model';
import { ReportSnippet } from '../report/models/report-snippet.model';
import { AstMetric } from '../json-ast-to-ast-model/models/ast-metric.model';
import { ReportMetric } from '../report/models/report-metric.model';

export class EvaluationService {

    static evaluate(astModel: AstModel): JsonReportInterface {
        const reportModel = new ReportModel();
        for (const astMetric of astModel.astMetrics) {
            this.evaluateAstMetric(reportModel, astMetric);
        }
        return reportModel;
    }

    private static evaluateAstMetric(reportModel: ReportModel, astMetric: AstMetric): void {
        try {
            const reportMetric = new ReportMetric(astMetric.metric.name);
            for (const astFile of astMetric.astFiles) {
                const reportSnippet = new ReportSnippet(astFile.name, astFile.code, astMetric.metric?.name);
                this.evaluateAstFileForMetric(astFile, reportSnippet, astMetric.metric);
                console.log(chalk.greenBright('REPORT SNIPPET'), reportSnippet);
                reportMetric.reportSnippets.push(reportSnippet);
                reportModel.reportMetrics.push(reportMetric);
            }
        } catch (err) {
            console.log(chalk.redBright('METRIC NOT FOUND'), err);
        }
    }

    private static evaluateAstFileForMetric(astFile: AstFile, reportFile: ReportSnippet, metric: Metric): void {
        METRIC_SERVICES[metric.id].evaluate(astFile, reportFile);
    }
}
