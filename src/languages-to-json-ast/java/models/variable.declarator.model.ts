import { Location } from './location.model';
import { VariableDeclaratorChildren } from './variable-declarator.children.model';

export class VariableDeclarator {
    name ?= '';
    children?: VariableDeclaratorChildren = new VariableDeclaratorChildren();
    location?: Location = new Location();
}
