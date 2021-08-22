import { JsonReportLineInterface } from './json-report-line.interface';

export interface JsonReportMethodInterface {

    lines: JsonReportLineInterface[];
    methodName: string;
    metricName: string;
    score: number;

}
