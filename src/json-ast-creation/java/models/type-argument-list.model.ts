import { Location } from './location.model';
import { TypeArgumentListChildren } from './type-argument-list-children.model';

export class TypeArgumentList {
    name ?= '';
    children?: TypeArgumentListChildren = new TypeArgumentListChildren();
    location?: Location = new Location();
}
