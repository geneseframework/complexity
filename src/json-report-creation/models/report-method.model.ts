import { ReportMethodInterface } from '../interfaces/report-method.interface';
import { ReportMethodMetric } from './report-method-metric.model';

export class ReportMethod implements ReportMethodInterface {
    reportMethodMetrics: ReportMethodMetric[] = [];
}
