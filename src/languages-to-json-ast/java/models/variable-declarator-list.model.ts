import { Location } from './location.model';
import { VariableDeclaratorListChildren } from './variable-declarator-list-children.model';

export class VariableDeclaratorList {
    name ?= '';
    children?: VariableDeclaratorListChildren = new VariableDeclaratorListChildren();
    location?: Location = new Location();
}
