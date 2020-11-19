import { NormalClassDeclarationChildren } from './normal-class-declaration-children.model';
import { Location } from './location.model';
import { Children } from '../interfaces/Children';

export class NormalClassDeclarationElement implements Children {
    name ?= '';
    children?: NormalClassDeclarationChildren = new NormalClassDeclarationChildren();
    location?: Location = new Location();
}
