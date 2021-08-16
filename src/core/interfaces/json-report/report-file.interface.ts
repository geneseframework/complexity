import { ReportMethodInterface } from './report-method.interface';

export interface ReportFileInterface {

    code: string;
    fileName: string;
    metricName: string;
    score: number;
    reportMethods: ReportMethodInterface[];

}
