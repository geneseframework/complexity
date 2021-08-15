import { ReportFolderInterface } from './report-folder.interface';
import { ReportMetricInterface } from './report-metric.interface';

export interface JsonReportInterface {
    metrics: ReportMetricInterface[];
    folder: ReportFolderInterface;
}
