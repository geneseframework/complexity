import { AstFolderInterface } from './ast-folder.interface';
import { MetricInterface } from '../metric.interface';

export interface JsonAstInterface {
    astFolder: AstFolderInterface;
    metrics: MetricInterface[];
}
