import { ReportFolderInterface } from './report-folder.interface';
import { MetricInterface } from '../../core/interfaces/metric.interface';

export interface JsonReportInterface {
    folder: ReportFolderInterface;
    metrics: MetricInterface[];
}
