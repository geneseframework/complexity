import { RowSnippet } from './row-snippet.model';
import { DivCodeMetric } from './div-code-metric.model';

export class HtmlReport {

    divCodeMetrics: DivCodeMetric[] = [];
    rowSnippets: RowSnippet[] = [];
    metricNames: string[] = [];

}
