import { CpxFactors } from '../../core/models/cpx-factor/cpx-factors.model';

/**
 * Interface for Classes which can be evaluated
 */
export interface Evaluate {

    cpxFactors: CpxFactors;     // The complexity factors of the object
    cyclomaticCpx?: number;      // The cyclomatic complexity of the object
    evaluate:() => void;        // The evaluation method

}
