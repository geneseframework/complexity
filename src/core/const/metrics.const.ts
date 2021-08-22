import { MetricInterface } from '../interfaces/json-report/metric.interface';
import { Metrics } from '../enum/metrics.enum';

export const COMPREHENSION_CPX: MetricInterface = {
    id: 'comprehension',
    name: Metrics.COMPREHENSION,
}

export const CYCLOMATIC_CPX: MetricInterface = {
    id: 'cyclomatic',
    name: Metrics.CYCLOMATIC
}
