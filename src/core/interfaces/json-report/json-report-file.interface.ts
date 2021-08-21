import { JsonReportMethodInterface } from './json-report-method.interface';
import { JsonReportLineInterface } from './json-report-line.interface';

export interface JsonReportFileInterface {

    fileName: string;
    lines: JsonReportLineInterface[];
    metricName: string;
    score?: number;
    reportMethods?: JsonReportMethodInterface[];

}
