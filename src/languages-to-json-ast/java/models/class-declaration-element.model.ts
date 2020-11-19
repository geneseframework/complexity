import { ClassDeclarationChildren } from './class-declaration-children.model';
import { Location } from './location.model';
import { Children } from '../interfaces/Children';

export class ClassDeclarationElement implements Children {
    name ?= '';
    children?: ClassDeclarationChildren = new ClassDeclarationChildren();
    location?: Location = new Location();
}
