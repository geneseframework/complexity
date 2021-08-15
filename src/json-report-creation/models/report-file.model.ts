import { ReportFileInterface } from '../interfaces/report-file.interface';
import { ReportMethod } from './report-method.model';

export class ReportFile implements ReportFileInterface {

    methods: ReportMethod[] = [];
    name: string = undefined;
    text: string = undefined;

    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
    }
}
