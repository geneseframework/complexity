import { Infos } from './infos.model';
import { Expression } from './expression.model';

export class ReturnStatementChildren {
    Return?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    Semicolon?: Infos[] = [new Infos()];
}
