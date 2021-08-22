import { MetricInterface } from '../interfaces/json-report/metric.interface';
import { Options } from './options.model';

export class Metric implements MetricInterface {

    folderPath: string = undefined;
    id: string = undefined
    name: string = undefined;

    constructor(metricInterface: MetricInterface) {
        this.id = metricInterface.id;
        this.name = metricInterface.name;
        this.folderPath = metricInterface.folderPath ?? `${Options.pathCommand}/src/evaluation/metrics/${metricInterface.id}.metric.ts`;
    }
}
