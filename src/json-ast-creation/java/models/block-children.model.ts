import { Infos } from './infos.model';
import { BlockStatements } from './block-statements.model';

export class BlockChildren {
    LCurly?: Infos[] = [new Infos()];
    blockStatements?: BlockStatements[] = [new BlockStatements()];
    RCurly?: Infos[] = [new Infos()];
}
