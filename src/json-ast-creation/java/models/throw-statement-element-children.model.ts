import { Expression } from './expression.model';
import { Infos } from './infos.model';

export class ThrowStatementElementChildren {
    Throw: Infos[] = [new Infos()];
    expression: Expression[] = [new Expression()];
    Semi: Expression[] = [new Expression()];
}
