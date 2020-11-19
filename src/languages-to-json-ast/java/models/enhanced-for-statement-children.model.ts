import { Infos } from './infos.model';
import { LocalVariableType } from './local-variable-type.model';
import { VariableDeclaratorId } from './variable-declarator-id.model';
import { Expression } from './expression.model';
import { Statement } from './statement.model';

export class EnhancedForStatementChildren {
    For?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    localVariableType?: LocalVariableType[] = [new LocalVariableType()];
    variableDeclaratorId?: VariableDeclaratorId[] = [new VariableDeclaratorId()];
    Colon?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    RBrace?: Infos[] = [new Infos()];
    statement?: Statement[] = [new Statement()];
}
