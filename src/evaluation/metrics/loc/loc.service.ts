import { AbstractMetricService } from '../services/abstract-metric.service';
import { AstFile } from '../../../core/models/ast/ast-file.model';
import { AstLine } from '../../../core/models/ast/ast-line.model';
import { ReportFile } from '../../../core/models/report/report-file.model';
import { ReportLine } from '../../../core/models/report/report-line.model';

export class LocService extends AbstractMetricService {

    evaluate(astFile: AstFile, reportFile: ReportFile): void {
        const astLines: AstLine[] = astFile.astCode.astLines;
        for (let i = 0; i < astLines.length; i++) {
            const reportLine = new ReportLine(i, astLines[i].text);
            this.evaluateLine(astLines[i], reportLine);
            reportFile.lines.push(reportLine);
            reportFile.score += reportLine.score;
        }
    }

    private evaluateLine(astLine: AstLine, reportLine: ReportLine): void {
        // console.log(chalk.cyanBright('EVAL LINEEEEE'), reportLine.issue, reportLine.text,  astLine.astNodes.map(a => a.kind));
        reportLine.score = astLine.astNodes.length > 0 ? 1 : 0;
        reportLine.comments = astLine.astNodes.length > 0 ? '+1' : '';
    }
}
