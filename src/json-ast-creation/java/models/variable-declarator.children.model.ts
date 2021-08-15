import { VariableDeclaratorId } from './variable-declarator-id.model';
import { Infos } from './infos.model';
import { VariableInitializer } from './variable-initializer.model';

export class VariableDeclaratorChildren {
    variableDeclaratorId?: VariableDeclaratorId[] = [new VariableDeclaratorId()];
    Equals?: Infos[] = [new Infos()];
    variableInitializer?: VariableInitializer[] = [new VariableInitializer()];
}
