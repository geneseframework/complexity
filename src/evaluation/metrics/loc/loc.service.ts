import * as chalk from 'chalk';
import { AbstractMetricService } from '../services/abstract-metric.service';
import { AstFile } from '../../../core/models/ast/ast-file.model';
import { AstLine } from '../../../core/models/ast/ast-line.model';
import { ReportFile } from '../../../core/models/report/report-file.model';
import { ReportLine } from '../../../core/models/report/report-line.model';

export class LocService extends AbstractMetricService {

    evaluate(astFile: AstFile, reportFile: ReportFile): void {
        // console.log(chalk.blueBright('LOC SERVICE'),  astFile);
        // console.log(chalk.magentaBright('EVAL LINEEEEE REPORT FILE'),  reportFile);
        const astLines: AstLine[] = astFile.astCode.astLines;
        for (let i = 0; i < astLines.length; i++) {
            const reportLine = new ReportLine(i, astLines[i].text);
            this.evaluateLine(astLines[i], reportLine);
        }
    }

    private evaluateLine(astLine: AstLine, reportLine: ReportLine): void {
        console.log(chalk.magentaBright('EVAL LINEEEEE'), reportLine.issue, reportLine.text,  astLine.astNodes.map(a => a.kind));
        // console.log(chalk.magentaBright('EVAL LINEEEEE'),  astLine.astNodes.map(a => a.start));
        reportLine.score = astLine.astNodes.length > 0 ? 1 : 0;
        reportLine.comments = astLine.astNodes.length > 0 ? '+1' : '';
        // console.log(chalk.cyanBright('EVAL REPORT LINEEEEE'),  reportLine);
    }
}
