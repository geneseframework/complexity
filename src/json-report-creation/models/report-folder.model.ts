import { ReportFolderInterface } from '../interfaces/report-folder.interface';
import { ReportFile } from './report-file.model';

export class ReportFolder implements ReportFolderInterface {

    files: ReportFile[] = [];
    children?: ReportFolder[] = [];
    path: string = undefined;

    constructor(path: string) {
        this.path = path;
    }

}
