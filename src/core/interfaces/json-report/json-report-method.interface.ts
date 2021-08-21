import { JsonReportLineInterface } from './json-report-line.interface';

export interface JsonReportMethodInterface {

    // code: string;
    lines: JsonReportLineInterface[];
    methodName: string;
    metricName: string;
    score: number;

}
