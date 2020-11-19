import { CatchType } from './catch-type.model';
import { VariableDeclaratorId } from './variable-declarator-id.model';

export class CatchFormalParameterChildren {
    catchType?: CatchType[] = [new CatchType()];
    variableDeclaratorId?: VariableDeclaratorId[] = [
        new VariableDeclaratorId(),
    ];
}
