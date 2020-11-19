import { AstFile } from '../../models/ast/ast-file.model';
import { AstMethod } from '../../models/ast/ast-method.model';
import { MethodStatus } from '../../enums/evaluation-status.enum';
import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { ComplexityType } from '../../enums/complexity-type.enum';

/**
 * - AstFiles generation from Abstract Syntax AstNode of a file
 * - Other services for AstFiles
 */
export class AstFileService extends StatsService {

    protected _stats: Stats = undefined;                                // The statistics of the AstFile
    astFile: AstFile = undefined;                                       // The AstFile corresponding to this service


    constructor() {
        super();
    }


    /**
     * Calculates the statistics of the AstFile
     * @param astFile    // The AstFile to analyse
     */
    calculateStats(astFile: AstFile): void {
        this._stats.numberOfMethods = astFile.astMethods?.length ?? 0;
        for (const method of astFile.astMethods) {
            this.incrementStats(method);
        }
    }


    /**
     * Increments AstFile statistics for a given method
     * @param astMethod    // The AstMethod to analyse
     */
    incrementStats(astMethod: AstMethod): void {
        this.incrementStatsMethodsByStatus(astMethod, ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(astMethod, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(astMethod.cpxIndex);
        this._stats.barChartCyclomatic.addResult(astMethod.cyclomaticCpx);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param astMethod        // The AstMethod to analyse
     * @param type              // The complexity type
     */
    incrementStatsMethodsByStatus(astMethod: AstMethod, type: ComplexityType): void {
        const status = (type === ComplexityType.COGNITIVE) ? astMethod.cognitiveStatus : astMethod.cyclomaticStatus;
        switch (status) {
            case MethodStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct ++;
                break;
            case MethodStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error ++;
                break;
            case MethodStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning ++;
                break;
            default:
                break;
        }
    }


    /**
     * Adds the filename to the stats
     */
    getNameOrPath(astFile: AstFile): void {
        this._stats.subject = astFile.name;
    }

}
