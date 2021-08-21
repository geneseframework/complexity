import { MetricInterface } from '../interfaces/json-report/metric.interface';
import { Metrics } from '../enum/metrics.enum';

export const COMPREHENSION_CPX: MetricInterface = {
    id: 'comprehension',
    methodsHighThreshold: 20,
    methodsMediumThreshold: 10,
    name: Metrics.COMPREHENSION,
}

export const CYCLOMATIC_CPX: MetricInterface = {
    id: 'cyclomatic',
    methodsHighThreshold: 10,
    methodsMediumThreshold: 5,
    name: Metrics.CYCLOMATIC
}
