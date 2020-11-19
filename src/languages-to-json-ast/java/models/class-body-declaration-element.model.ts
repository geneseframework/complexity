import { Location } from './location.model';
import { ClassBodyDeclarationChildren } from './class-body-declaration-children.model';

export class ClassBodyDeclarationElement {
    name ?= '';
    children?: ClassBodyDeclarationChildren = new ClassBodyDeclarationChildren();
    location?: Location = new Location();
}
