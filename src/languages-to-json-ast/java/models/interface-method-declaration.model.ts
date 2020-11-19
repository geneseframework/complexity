import { Location } from './location.model';
import { InterfaceMethodDeclarationChildren } from './interface-method-declaration-children.model';

export class InterfaceMethodDeclaration {
    name ?= '';
    children?: InterfaceMethodDeclarationChildren = new InterfaceMethodDeclarationChildren();
    location?: Location = new Location();
}
