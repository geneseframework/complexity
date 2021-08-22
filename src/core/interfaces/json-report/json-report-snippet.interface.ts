import { JsonReportLineInterface } from './json-report-line.interface';

export interface JsonReportSnippetInterface {

    name: string;
    lines: JsonReportLineInterface[];
    measure?: number;
    metricName: string;
    score?: number;

}
