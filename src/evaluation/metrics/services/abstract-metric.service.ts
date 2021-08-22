import { AstFile } from '../../../core/models/ast/ast-file.model';
import { ReportSnippet } from '../../../core/models/report/report-snippet.model';

export abstract class AbstractMetricService {

    abstract evaluate(astFile: AstFile, reportFile: ReportSnippet): void;

}
