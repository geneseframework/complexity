import { JsonReportFileInterface } from '../../interfaces/json-report/json-report-file.interface';
import { ReportMethod } from './report-method.model';
import { AstNode } from '../../../html-generation/models/ast/ast-node.model';

export class ReportFile implements JsonReportFileInterface {

    code: string = undefined;
    fileName: string = undefined;
    metricName: string = undefined;
    node: AstNode = undefined;
    reportMethods: ReportMethod[] = [];
    score: number = undefined;

    constructor(fileName: string, code: string) {
        this.fileName = fileName;
        this.code = code;
    }

}
