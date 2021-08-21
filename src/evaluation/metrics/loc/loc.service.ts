import * as chalk from 'chalk';
import { AbstractMetricService } from '../services/abstract-metric.service';
import { AstFile } from '../../../core/models/ast/ast-file.model';
import { AstLine } from '../../../core/models/ast/ast-line.model';
import { ReportFile } from '../../../core/models/report/report-file.model';

export class LocService extends AbstractMetricService {

    evaluate(astFile: AstFile, reportFile: ReportFile): void {
        // console.log(chalk.blueBright('LOC SERVICE'),  astFile);
        // console.log(chalk.magentaBright('EVAL LINEEEEE REPORT FILE'),  reportFile);
        for (const astLine of astFile.astCode.astLines) {
            this.evaluateLine(astLine, reportFile);
        }
    }

    private evaluateLine(astLine: AstLine, reportFile: ReportFile): void {
        console.log(chalk.magentaBright('EVAL LINEEEEE'),  astLine.astNodes.map(a => a.kind));

    }
}
