import { InterfaceMemberDeclarationChildren } from './interface-member-declaration-children.model';
import { Location } from './location.model';

export class InterfaceMemberDeclaration {
    name ?= '';
    children?: InterfaceMemberDeclarationChildren = new InterfaceMemberDeclarationChildren();
    location?: Location = new Location();
}
