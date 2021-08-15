import { Infos } from './infos.model';
import { ArgumentList } from './argument-list.model';

export class MethodInvocationSuffixChildren {
    LBrace?: Infos[] = [new Infos()];
    argumentList?: ArgumentList[] = [new ArgumentList()];
    RBrace?: Infos[] = [new Infos()];
}
