import { Block } from './block.model';
import { Catches } from './catches.model';
import { Finally } from './finally.model';
import { Infos } from './infos.model';

export class TryStatementChildren {
    Try?: Infos[] = [new Infos()];
    block?: Block[] = [new Block()];
    catches?: Catches[] = [new Catches()];
    finally: Finally[] = [new Finally()];
}
