import { JsonReportFileInterface } from './json-report-file.interface';

export interface JsonReportFolderInterface {

    files: JsonReportFileInterface[];
    children?: JsonReportFolderInterface[];
    path: string;

}
