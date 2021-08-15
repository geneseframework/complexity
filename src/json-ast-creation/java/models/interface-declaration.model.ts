import { Location } from './location.model';
import { InterfaceDeclarationChildren } from './interface-declaration-children.model';

export class InterfaceDeclaration {
    name ?= '';
    children?: InterfaceDeclarationChildren = new InterfaceDeclarationChildren();
    location?: Location = new Location();
}
