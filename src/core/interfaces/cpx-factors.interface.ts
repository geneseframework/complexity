import { AggregationCpx } from '../models/cpx-factor/aggregation-cpx.model';
import { AtomicCpx } from '../models/cpx-factor/atomic-cpx.model';
import { ContextCpx } from '../models/cpx-factor/context-cpx.model';
import { DepthCpx } from '../models/cpx-factor/depth-cpx.model';
import { NestingCpx } from '../models/cpx-factor/nesting-cpx.model';
import { RecursionCpx } from '../models/cpx-factor/recursion-cpx.model';
import { StructuralCpx } from '../models/cpx-factor/structural-cpx.model';
import { UseCpx } from '../models/cpx-factor/use-cpx.model';

export interface CpxFactorsInterface {

    aggregation?: AggregationCpx;        // Aggregation Complexity
    atomic?: AtomicCpx;                       // Atomic Complexity
    context?: ContextCpx;                    // Context Complexity
    depth?: DepthCpx;                          // Depth Complexity
    nesting?: NestingCpx;                    // Nesting Complexity
    recursion?: RecursionCpx;              // Recursion Complexity
    structural?: StructuralCpx;           // Structural Complexity
    use?: UseCpx;                                // Use Complexity

}
