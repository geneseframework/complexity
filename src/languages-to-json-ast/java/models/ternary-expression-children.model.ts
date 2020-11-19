import { BinaryExpression } from './binary-expression.model';
import { Expression } from './expression.model';
import { Infos } from './infos.model';

export class TernaryExpressionChildren {
    binaryExpression?: BinaryExpression[] = [new BinaryExpression()];
    expression?: Expression[] = [new Expression()];
    QuestionMark?: Infos[] = [new Infos()];
    Colon?: Infos[] = [new Infos()];
}
