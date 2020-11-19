import { Infos } from './infos.model';
import { Expression } from './expression.model';

export class AssertStatementChildren {
    Assert?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
}
