import { ReportMethodInterface } from './report-method.interface';

export interface ReportFileInterface {
    methods: ReportMethodInterface[];
    name: string;
    text: string;
}
