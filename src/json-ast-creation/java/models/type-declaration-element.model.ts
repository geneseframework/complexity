import { Location } from './location.model';
import { TypeDeclarationChildren } from './type-declaration-children.model';

export class TypeDeclarationElement {
    name ?= '';
    children?: TypeDeclarationChildren = new TypeDeclarationChildren();
    location?: Location = new Location();
}
