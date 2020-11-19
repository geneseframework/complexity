import { Block } from './block.model';
import { Infos } from './infos.model';

export class FinallyChildren {
    Finally?: Infos[] = [new Infos()];
    block?: Block[] = [new Block()];
}
