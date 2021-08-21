import { AstModel } from '../../../core/models/ast/ast.model';
import { AstFolder } from '../../../core/models/ast/ast-folder.model';
import { ReportModel } from '../../../core/models/report/report.model';

export abstract class AbstractMetricService {

    abstract evaluate(astFolder: AstFolder, reportModel: ReportModel): void;

}
