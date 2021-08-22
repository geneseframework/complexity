import { JsonReportSnippetInterface } from '../../core/interfaces/json-report/json-report-snippet.interface';
import { ReportLine } from './report-line.model';

export class ReportSnippet implements JsonReportSnippetInterface {

    lines: ReportLine[] = [];
    measure: number = undefined;
    name: string = undefined;
    metricName: string = undefined;
    score = 0;
    text: string = undefined;

    constructor(name: string, text: string, metricName: string) {
        this.name = name;
        this.text = text;
        this.metricName = metricName;
    }

}
