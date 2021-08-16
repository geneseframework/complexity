import { ReportMethodInterface } from '../interfaces/report-method.interface';

export class ReportMethod implements ReportMethodInterface {

    code: string = undefined;
    methodName: string = undefined;
    metricName: string = undefined;
    score: number = undefined;

    constructor(methodName: string, code: string) {
    }

}
