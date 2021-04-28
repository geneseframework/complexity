import { FactorCategory } from '../../../json-ast-to-reports/enums/factor-category.enum';
import { addObjects, capitalize } from '../../services/tools.service';
import { Addition } from '../../../json-ast-to-reports/interfaces/addition.interface';
import { AggregationCpx } from './aggregation-cpx.model';
import { NestingCpx } from './nesting-cpx.model';
import { AtomicCpx } from './atomic-cpx.model';
import { StructuralCpx } from './structural-cpx.model';
import { DepthCpx } from './depth-cpx.model';
import { ContextCpx } from './context-cpx.model';
import { RecursionCpx } from './recursion-cpx.model';
import { UseCpx } from './use-cpx.model';
import { CpxFactorsInterface } from '../../interfaces/cpx-factors.interface';
import { TypingCpx } from './readability-cpx.model';
import * as chalk from 'chalk';

/**
 * The Complexity Factors
 */
export class CpxFactors implements CpxFactorsInterface, Addition<CpxFactors>{

    aggregation?: AggregationCpx = new AggregationCpx();        // Aggregation Complexity
    atomic?: AtomicCpx = new AtomicCpx();                       // Atomic Complexity
    context?: ContextCpx = new ContextCpx();                    // Context Complexity
    depth?: DepthCpx = new DepthCpx();                          // Depth Complexity
    nesting?: NestingCpx = new NestingCpx();                    // Nesting Complexity
    recursion?: RecursionCpx = new RecursionCpx();              // Recursion Complexity
    structural?: StructuralCpx = new StructuralCpx();           // Structural Complexity
    typing?: TypingCpx = new TypingCpx();                       // Typing Complexity
    use?: UseCpx = new UseCpx();                                // Use Complexity



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    /**
     * Returns the total of Complexity Factors (the Complexity Index)
     */
    get total(): number {
        let total = 0;
        for (const key of Object.keys(this)) {
            total += this[`total${capitalize(key)}`] ?? 0;
        }
        return +total.toFixed(1);
    }


    get totalAggregation(): number {
        return this.totalByFactorCategory(FactorCategory.AGGREGATION)
    }


    get totalAtomic(): number {
        return this.totalByFactorCategory(FactorCategory.ATOMIC)
    }


    get totalDepth(): number {
        return this.totalByFactorCategory(FactorCategory.DEPTH)
    }


    get totalNesting(): number {
        return this.totalByFactorCategory(FactorCategory.NESTING)
    }


    get totalTyping(): number {
        return this.totalByFactorCategory(FactorCategory.TYPING)
    }


    get totalRecursion(): number {
        return this.totalByFactorCategory(FactorCategory.RECURSION)
    }


    get totalStructural(): number {
        return this.totalByFactorCategory(FactorCategory.STRUCTURAL)
    }


    get totalUse(): number {
        return this.totalByFactorCategory(FactorCategory.USE)
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Returns the total Complexity Index for a given Category of Factors
     * @param factorCategory
     */
    private totalByFactorCategory(factorCategory: FactorCategory): number {
        let total = 0;
        for (const keyFeature of Object.keys(this[factorCategory])) {
            total += this[factorCategory][keyFeature] ?? 0;
        }
        return total;
    }


    /**
     * Adds a CpxFactors object to another one
     * @param cpxFactors
     */
    add(cpxFactors: CpxFactors): CpxFactors {
        return addObjects<CpxFactors>(this, cpxFactors, CpxFactors);
    }

}
