import { JsonReportMethodInterface } from './json-report-method.interface';

export interface JsonReportFileInterface {

    code: string;
    fileName: string;
    metricName: string;
    score: number;
    reportMethods: JsonReportMethodInterface[];

}
