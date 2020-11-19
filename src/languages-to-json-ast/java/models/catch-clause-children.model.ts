import { Block } from './block.model';
import { CatchFormalParameter } from './catch-formal-parameter.model';
import { Infos } from './infos.model';

export class CatchClauseChildren {
    Catch?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    catchFormalParameter?: CatchFormalParameter[] = [
        new CatchFormalParameter(),
    ];
    RBrace?: Infos[] = [new Infos()];
    block?: Block[] = [new Block()];
}
