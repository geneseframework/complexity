import { Infos } from './infos.model';
import { SwitchCase } from './switch-case.model';

export class SwitchBlockChildren {
    LCurly?: Infos[] = [new Infos()];
    switchCase?: SwitchCase[] = [new SwitchCase()];
    RCurly?: Infos[] = [new Infos()];
}
