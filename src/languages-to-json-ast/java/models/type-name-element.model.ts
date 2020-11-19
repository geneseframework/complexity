import { Location } from './location.model';
import { TypeNameChildren } from './type-name-children.model';

export class TypeNameElement {
    name ?= '';
    children?: TypeNameChildren = new TypeNameChildren();
    location?: Location = new Location();
}
