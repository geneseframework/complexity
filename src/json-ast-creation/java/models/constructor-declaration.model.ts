import { ConstructorDeclarationElementChildren } from './constructor-declaration-children.model';
import { Location } from './location.model';

export class ConstructorDeclarationElement {
    name ?= '';
    children?: ConstructorDeclarationElementChildren = new ConstructorDeclarationElementChildren();
    location?: Location = new Location();
}
