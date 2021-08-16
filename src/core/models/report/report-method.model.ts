import { JsonReportMethodInterface } from '../../interfaces/json-report/json-report-method.interface';

export class ReportMethod implements JsonReportMethodInterface {

    code: string = undefined;
    methodName: string = undefined;
    metricName: string = undefined;
    score: number = undefined;

    constructor(methodName: string, code: string) {
    }

}
