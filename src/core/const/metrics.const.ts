import { MetricInterface } from '../interfaces/metric.interface';
import { Metrics } from '../enum/metrics.enum';

export const COMPREHENSION_CPX: MetricInterface = {
    highThreshold: 20,
    mediumThreshold: 10,
    name: Metrics.COMPREHENSION,
}

export const CYCLOMATIC_CPX: MetricInterface = {
    highThreshold: 10,
    mediumThreshold: 5,
    name: Metrics.CYCLOMATIC,
}
