import { Location } from './location.model';
import { MethodDeclaratorChildren } from './method-declarator-children.model';

export class MethodDeclarator {
    name ?= '';
    children?: MethodDeclaratorChildren = new MethodDeclaratorChildren();
    location?: Location = new Location();
}
