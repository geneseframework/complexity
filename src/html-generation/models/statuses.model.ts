import { Addition } from '../interfaces/addition.interface';

/**
 * Number of elements by complexity status
 */
export class RepartitionByStatus implements Addition<RepartitionByStatus>{

    correct ?= 0;       // Number of elements with status "correct"
    warning ?= 0;       // Number of elements with status "warning"
    error ?= 0;         // Number of elements with status "error"


    /**
     * Adds other repartitionByStatus
     * @param repartitionByStatus
     */
    add(repartitionByStatus: RepartitionByStatus): RepartitionByStatus {
        let newStatuses = new RepartitionByStatus();
        newStatuses.correct = this.correct + repartitionByStatus.correct;
        newStatuses.warning = this.warning + repartitionByStatus.warning;
        newStatuses.error = this.error + repartitionByStatus.error;
        return newStatuses;
    }
}
