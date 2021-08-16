import { JsonAstFolderInterface } from './json-ast-folder.interface';
import { MetricInterface } from '../json-report/metric.interface';

export interface JsonAstInterface {

    astFolder: JsonAstFolderInterface;
    metrics?: MetricInterface[];

}
