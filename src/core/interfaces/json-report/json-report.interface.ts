import { JsonReportFolderInterface } from './json-report-folder.interface';
import { MetricInterface } from './metric.interface';

export interface JsonReportInterface {
    folder: JsonReportFolderInterface;
    metrics?: MetricInterface[];
}
