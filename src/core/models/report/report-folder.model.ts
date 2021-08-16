import { JsonReportFolderInterface } from '../../interfaces/json-report/json-report-folder.interface';
import { ReportFile } from './report-file.model';

export class ReportFolder implements JsonReportFolderInterface {

    children?: ReportFolder[] = [];
    files: ReportFile[] = [];
    path: string = undefined;

    constructor(path: string) {
        this.path = path;
    }

}
