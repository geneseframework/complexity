import { ReportFileInterface } from './report-file.interface';

export interface ReportFolderInterface {

    files: ReportFileInterface[];
    children?: ReportFolderInterface[];
    path: string;

}
