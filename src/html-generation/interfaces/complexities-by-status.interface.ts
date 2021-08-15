import { RepartitionByStatus } from '../models/statuses.model';
import { Addition } from './addition.interface';

/**
 * Repartition by status for each kind of complexity
 */
export class ComplexitiesByStatus implements Addition<ComplexitiesByStatus> {

    cognitive?: RepartitionByStatus = new RepartitionByStatus();        // The repartition by status of the cognitive complexity
    cyclomatic?: RepartitionByStatus = new RepartitionByStatus();       // The repartition by status of the cyclomatic complexity


    /**
     * Adds other cognitive and cyclomatic complexities
     * @param cpxByStatus
     */
    add(cpxByStatus: ComplexitiesByStatus): ComplexitiesByStatus {
        if (!cpxByStatus) {
            return new ComplexitiesByStatus();
        }
        const result: ComplexitiesByStatus = new ComplexitiesByStatus();
        result.cognitive = result.cognitive.add(cpxByStatus.cognitive);
        result.cyclomatic = result.cyclomatic.add(cpxByStatus.cyclomatic);
        return result;
    }

}
