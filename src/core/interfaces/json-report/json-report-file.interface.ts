import { JsonReportMethodInterface } from './json-report-method.interface';

export interface JsonReportFileInterface {

    fileName: string;
    metricName: string;
    score: number;
    reportMethods: JsonReportMethodInterface[];
    text: string;

}
