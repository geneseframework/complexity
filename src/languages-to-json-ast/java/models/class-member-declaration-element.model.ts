import { Location } from './location.model';
import { ClassMemberDeclarationChildren } from './class-member-declaration-children.model';

export class ClassMemberDeclarationElement {
    name ?= '';
    children?: ClassMemberDeclarationChildren = new ClassMemberDeclarationChildren();
    location?: Location = new Location(); 
}
