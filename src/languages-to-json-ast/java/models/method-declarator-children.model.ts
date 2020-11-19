import { Infos } from './infos.model';
import { FormalParameterList } from './formal-parameter-list.model';

export class MethodDeclaratorChildren {
    Identifier?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    formalParameterList?: FormalParameterList[] = [new FormalParameterList()];
    RBrace?: Infos[] = [new Infos()];
}
