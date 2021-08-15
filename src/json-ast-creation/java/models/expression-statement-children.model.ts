import { Infos } from './infos.model';
import { StatementExpression } from './statement-expression.model';

export class ExpressionStatementChildren {
    statementExpression?: StatementExpression[] = [new StatementExpression()];
    Semicolon?: Infos[] = [new Infos()];
}
