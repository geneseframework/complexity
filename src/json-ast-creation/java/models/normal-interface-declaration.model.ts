import { Location } from './location.model';
import { NormalInterfaceDeclarationChildren } from './normal-interface-declaration-children.model';

export class NormalInterfaceDeclaration {
    name ?= '';
    children?: NormalInterfaceDeclarationChildren = new NormalInterfaceDeclarationChildren();
    location?: Location = new Location();
}
