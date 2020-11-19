import { UnannType } from './unann-type.model';
import { VariableDeclaratorId } from './variable-declarator-id.model';

export class VariableParaRegularParameterChildren {
    unannType: UnannType[] = [new UnannType()];
    variableDeclaratorId: VariableDeclaratorId[] = [new VariableDeclaratorId()];
}
