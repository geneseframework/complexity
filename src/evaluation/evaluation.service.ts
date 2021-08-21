import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import { AstModel } from '../core/models/ast/ast.model';
import * as chalk from 'chalk';
import { Metric } from '../core/models/report/metric.model';
import { ReportModel } from '../core/models/report/report.model';

export class EvaluationService {

    static evaluate(astModel: AstModel): JsonReportInterface {
        console.log(chalk.magentaBright('EVAL SERVICEEEEE'), astModel);
        const reportModel = new ReportModel(astModel.metrics);
        for (const metric of reportModel.metrics) {
            this.evaluateForMetric(metric);
        }
        const jsonReport: JsonReportInterface = reportModel;
        console.log(chalk.magentaBright('EVAL SERVICEEEEE JSONREPORTTTTT'), jsonReport);
        return jsonReport;
    }

    private static evaluateForMetric(metric: Metric): void {
        console.log(chalk.cyanBright('EVAL SERVICEEEEE'), metric);

    }
}
