import { JsonReportFileInterface } from '../../interfaces/json-report/json-report-file.interface';
import { ReportMethod } from './report-method.model';
import { AstNode } from '../../../html-generation/models/ast/ast-node.model';

export class ReportFile implements JsonReportFileInterface {

    fileName: string = undefined;
    metricName: string = undefined;
    node: AstNode = undefined;
    reportMethods: ReportMethod[] = [];
    score: number = undefined;
    text: string = undefined;

    constructor(fileName: string, text: string, metricName: string) {
        this.fileName = fileName;
        this.text = text;
        this.metricName = metricName;
    }

}
