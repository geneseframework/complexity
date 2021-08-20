import { MetricInterface } from '../../interfaces/json-report/metric.interface';
import { Options } from '../options.model';

export class Metric implements MetricInterface {

    folderPath: string = undefined;
    id: string = undefined
    methodsHighThreshold: number = undefined;
    methodsMediumThreshold: number = undefined;
    name: string = undefined;

    constructor(metricInterface: MetricInterface) {
        this.id = metricInterface.id;
        this.name = metricInterface.name;
        this.methodsHighThreshold = metricInterface.methodsHighThreshold ?? 0;
        this.methodsMediumThreshold = metricInterface.methodsMediumThreshold ?? 0;
        this.folderPath = metricInterface.folderPath ?? `${Options.pathCommand}/evaluation/metrics/${metricInterface.id}`;
    }
}
