import { AstMethod } from '../../models/ast/ast-method.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { MethodReport } from '../../models/report/method-report.model';

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
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.COGNITIVE, astMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, ComplexityType.CYCLOMATIC, astMethod.cyclomaticStatus);
        return cpx;
    }


    /**
     * For a given complexity type, returns the value of a ComplexitiesByStatus object incremented of one for a given MethodStatus
     * @param cpxByStatus       // The ComplexitiesByStatus object
     * @param complexityType    // The type of complexity to increment
     * @param methodStatus      // The complexity status
     */
    private incrementMethodByCpxType(cpxByStatus: ComplexitiesByStatus, complexityType: ComplexityType, methodStatus: MethodStatus): ComplexitiesByStatus {
        const status: ComplexitiesByStatus = cpxByStatus;
        switch (methodStatus) {
            case MethodStatus.CORRECT:
                status[complexityType].correct = status[complexityType].correct + 1;
                break;
            case MethodStatus.WARNING:
                status[complexityType].warning++;
                break;
            case MethodStatus.ERROR:
                status[complexityType].error++;
                break;
            default:
                break;
        }
        return status;
    }

}
