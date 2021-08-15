import { Location } from './location.model';
import { SimpleTypeNameChildren } from './simple-type-name-children.model';

export class SimpleTypeName {
    name ?= '';
    children?: SimpleTypeNameChildren = new SimpleTypeNameChildren();
    location?: Location = new Location();
}
