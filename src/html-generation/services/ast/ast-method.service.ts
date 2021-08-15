import { AstMethod } from '../../models/ast/ast-method.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { MethodReport } from '../../models/report/method-report.model';
import { CpxLevel } from '../../enums/cpx-level.enum';

export class AstMethodService {

    /**
     * The method sorting the rows of the methods report by decreasing cognitive complexity
     * @param methodsReport     // The array to sort
     */
    static sortByDecreasingCognitiveCpx(methodsReport: MethodReport[]): MethodReport[] {
        return methodsReport.sort((a, b) => b.cpxIndex - a.cpxIndex);
    }

    /**
     * Returns the addition of a ComplexitiesByStatus object and the complexities scores of a given astMethod
     * @param cpxByStatus   // The object to add
     * @param astMethod    // The AstMethod in question
     */
    addMethodCpxByStatus(cpxByStatus: ComplexitiesByStatus, astMethod: AstMethod): ComplexitiesByStatus {
        let cpx: ComplexitiesByStatus = cpxByStatus ?? new ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.COGNITIVE, astMethod.cognitiveLevel);
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.CYCLOMATIC, astMethod.cyclomaticLevel);
        return cpx;
    }


    /**
     * For a given complexity type, returns the value of a ComplexitiesByStatus object incremented of one for a given CpxLevel
     * @param cpxByStatus       // The ComplexitiesByStatus object
     * @param complexityType    // The type of complexity to increment
     * @param cpxLevel      // The complexity status
     */
    private incrementMethodByCpxType(cpxByStatus: ComplexitiesByStatus, complexityType: ComplexityType, cpxLevel: CpxLevel): ComplexitiesByStatus {
        const status: ComplexitiesByStatus = cpxByStatus;
        switch (cpxLevel) {
            case CpxLevel.LOW:
                status[complexityType].correct = status[complexityType].correct + 1;
                break;
            case CpxLevel.MEDIUM:
                status[complexityType].warning++;
                break;
            case CpxLevel.HIGH:
                status[complexityType].error++;
                break;
            default:
                break;
        }
        return status;
    }

}
