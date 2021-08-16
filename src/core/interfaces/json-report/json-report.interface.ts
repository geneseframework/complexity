import { ReportFolderInterface } from './report-folder.interface';
import { MetricInterface } from './metric.interface';

export interface JsonReportInterface {
    folder: ReportFolderInterface;
    metrics?: MetricInterface[];
}
