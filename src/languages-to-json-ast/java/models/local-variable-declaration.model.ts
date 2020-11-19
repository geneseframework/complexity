import { Location } from './location.model';
import { LocalVariableDeclarationChildren } from './local-variable-declaration-children.model';

export class LocalVariableDeclaration {
    name ?= '';
    children?: LocalVariableDeclarationChildren = new LocalVariableDeclarationChildren();
    location?: Location = new Location();
}
