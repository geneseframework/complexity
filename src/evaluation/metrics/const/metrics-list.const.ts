import { LocService } from '../loc/loc.service';
import { AbstractMetricService } from '../services/abstract-metric.service';

export const METRIC_SERVICES: { [metricName: string]: AbstractMetricService } = {
    "loc": new LocService()
}

