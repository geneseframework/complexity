import { Location } from './location.model';
import { VariableDeclaratorIdChildren } from './variable-declarator-id-children.model';

export class VariableDeclaratorId {
    name ?= '';
    children?: VariableDeclaratorIdChildren = new VariableDeclaratorIdChildren();
    location?: Location = new Location();
}
