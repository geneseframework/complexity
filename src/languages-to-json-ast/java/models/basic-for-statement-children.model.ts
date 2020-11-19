import { Infos } from './infos.model';
import { Statement } from './statement.model';
import { Expression } from './expression.model';
import { ForInit } from './for-init.model';
import { ForUpdate } from './for-update.model';

export class BasicForStatementChildren {
    For?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    forInit?: ForInit[] = [new ForInit()];
    Semicolon?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    forUpdate?: ForUpdate[] = [new ForUpdate()];
    RBrace?: Infos[] = [new Infos()];
    statement?: Statement[] = [new Statement()];
}
