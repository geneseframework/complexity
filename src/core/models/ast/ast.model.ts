import { MetricInterface } from '../../interfaces/json-report/metric.interface';
import { AstFolder } from './ast-folder.model';

export class AstModel {

    astFolder: AstFolder = undefined;
    metrics?: MetricInterface[] = [];

    constructor(metrics?: MetricInterface[]) {
        this.metrics = metrics;
    }

}
