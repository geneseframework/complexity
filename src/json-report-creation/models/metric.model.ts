import { MetricInterface } from '../interfaces/metric.interface';

export class Metric implements MetricInterface {

    methodsHighThreshold: number = undefined;
    methodsMediumThreshold: number = undefined;
    name: string = undefined;

    constructor(highThreshold: number, mediumThreshold: number, name: string) {
        this.methodsHighThreshold = highThreshold;
        this.methodsMediumThreshold = mediumThreshold;
        this.name = name;
    }
}
