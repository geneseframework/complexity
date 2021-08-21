import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import { AstModel } from '../core/models/ast/ast.model';
import * as chalk from 'chalk';
import { Metric } from '../core/models/report/metric.model';
import { ReportModel } from '../core/models/report/report.model';
import { METRIC_SERVICES } from './metrics/const/metrics-list.const';

export class EvaluationService {

    static evaluate(astModel: AstModel): JsonReportInterface {
        // console.log(chalk.magentaBright('EVAL SERVICEEEEE'), astModel);
        const reportModel = new ReportModel(astModel.metrics);
        for (const metric of reportModel.metrics) {
            this.evaluateForMetric(astModel, metric);
        }
        return reportModel;
    }

    private static evaluateForMetric(astModel: AstModel, metric: Metric): void {
        try {
            console.log(chalk.cyanBright('EVAL METRICCCC'), metric);
            METRIC_SERVICES[metric.id].evaluate(astModel);
        } catch (err) {
            console.log(chalk.redBright('METRIC NOT FOUND'), err);
        }
    }
}
