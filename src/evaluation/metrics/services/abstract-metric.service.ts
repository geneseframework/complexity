import { AstFile } from '../../../json-ast-to-ast-model/models/ast-file.model';
import { ReportSnippet } from '../../../report-generation/models/report-snippet.model';

export abstract class AbstractMetricService {

    abstract evaluate(astFile: AstFile, reportFile: ReportSnippet): void;

}
