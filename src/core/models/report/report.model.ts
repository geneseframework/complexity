import { JsonReportInterface } from '../../interfaces/json-report/json-report.interface';
import { MetricInterface } from '../../interfaces/json-report/metric.interface';
import { Metric } from './metric.model';
import { ReportSnippet } from './report-snippet.model';

export class ReportModel implements JsonReportInterface {

    codeSnippets: ReportSnippet[] = [];
    metrics: Metric[] = [];

    constructor(metrics: MetricInterface[]) {
        this.setMetrics(metrics);
    }

    private setMetrics(metrics: MetricInterface[]): void {
        for (const metric of metrics) {
            this.metrics.push(new Metric(metric));
        }
    }
}
