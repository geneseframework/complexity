import { LocalVariableType } from './local-variable-type.model';
import { VariableDeclaratorList } from './variable-declarator-list.model';

export class LocalVariableDeclarationChildren {
    localVariableType?: LocalVariableType[] = [new LocalVariableType()];
    variableDeclaratorList?: VariableDeclaratorList[] = [new VariableDeclaratorList()];
}
