import { ReportFileInterface } from '../interfaces/report-file.interface';
import { ReportMethod } from './report-method.model';

export class ReportFile implements ReportFileInterface {

    code: string = undefined;
    fileName: string = undefined;
    metricName: string = undefined;
    reportMethods: ReportMethod[] = [];
    score: number = undefined;

    constructor(fileName: string, code: string) {
        this.fileName = fileName;
        this.code = code;
    }

}
