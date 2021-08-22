import { JsonReportMethodInterface } from '../../interfaces/json-report/json-report-method.interface';
import { ReportLine } from './report-line.model';

export class ReportMethod implements JsonReportMethodInterface {

    lines: ReportLine[] = [];
    methodName: string = undefined;
    metricName: string = undefined;
    score: number = undefined;

    constructor(methodName: string, code: string) {
    }

}
