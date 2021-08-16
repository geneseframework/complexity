import { AstFolderInterface } from './ast-folder.interface';
import { MetricInterface } from '../json-report/metric.interface';

export interface JsonAstInterface {
    astFolder: AstFolderInterface;
    metrics?: MetricInterface[];
}
