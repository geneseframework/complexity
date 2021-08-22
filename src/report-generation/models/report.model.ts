import { JsonReportInterface } from '../../core/interfaces/json-report/json-report.interface';
import { ReportMetric } from './report-metric.model';

export class ReportModel implements JsonReportInterface {

    reportMetrics: ReportMetric[] = [];

}
