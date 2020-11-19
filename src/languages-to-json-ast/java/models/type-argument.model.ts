import { Location } from './location.model';
import { TypeArgumentChildren } from './type-argument-children.model';

export class TypeArgument {
    name ?= '';
    children?: TypeArgumentChildren = new TypeArgumentChildren();
    location?: Location = new Location();
}
