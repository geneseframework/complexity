import { JsonReportLineInterface } from '../../core/interfaces/json-report/json-report-line.interface';

export class ReportLine implements JsonReportLineInterface {

    comments: string = undefined;
    issue: number = undefined;
    score: number = undefined;
    text: string = undefined;

    constructor(issue: number, text: string) {
        this.issue = issue;
        this.text = text;
    }

}
