import { ReportSnippet } from './report-snippet.model';

export class ReportMetric {

    metricName: string = undefined;
    reportSnippets: ReportSnippet[] = [];

    constructor(metricName: string) {
        this.metricName = metricName;
    }
}
