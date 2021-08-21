import { AstModel } from '../../../core/models/ast/ast.model';

export abstract class AbstractMetricService {

    abstract evaluate(astModel: AstModel): void;

}
