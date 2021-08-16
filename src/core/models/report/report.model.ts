import { JsonReportInterface } from '../../interfaces/json-report/json-report.interface';
import { MetricInterface } from '../../interfaces/json-report/metric.interface';
import { ReportFolder } from './report-folder.model';
import { Metric } from './metric.model';

export class ReportModel implements JsonReportInterface {

    folder: ReportFolder = undefined;
    metrics: Metric[] = [];

    constructor(metrics: MetricInterface[]) {
        this.setMetrics(metrics);
    }

    private setMetrics(metrics: MetricInterface[]): void {
        for (const metric of metrics) {
            this.metrics.push(new Metric(metric.methodsHighThreshold, metric.methodsMediumThreshold, metric.name));
        }
    }
}
