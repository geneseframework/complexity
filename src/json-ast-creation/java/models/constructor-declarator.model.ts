import { ConstructorDeclaratorChildren } from './constructor-declarator-children.model';
import { Location } from './location.model';

export class ConstructorDeclarator {
    name ?= '';
    children?: ConstructorDeclaratorChildren = new ConstructorDeclaratorChildren();
    location?: Location = new Location();
}
