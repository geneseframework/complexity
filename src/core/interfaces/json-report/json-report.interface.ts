import { MetricInterface } from './metric.interface';
import { JsonReportSnippetInterface } from './json-report-snippet.interface';

export interface JsonReportInterface {

    codeSnippets: JsonReportSnippetInterface[];
    metrics?: MetricInterface[];

}
