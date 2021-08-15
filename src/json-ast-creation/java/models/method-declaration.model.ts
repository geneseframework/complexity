import { Location } from './location.model';
import { MethodDeclarationChildren } from './method-declaration-children.model';

export class MethodDeclaration {
    name ?= '';
    children?: MethodDeclarationChildren = new MethodDeclarationChildren();
    location?: Location = new Location();
}
