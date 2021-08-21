import { AstFile } from '../../../core/models/ast/ast-file.model';
import { ReportFile } from '../../../core/models/report/report-file.model';

export abstract class AbstractMetricService {

    abstract evaluate(astFile: AstFile, reportFile: ReportFile): void;

}
