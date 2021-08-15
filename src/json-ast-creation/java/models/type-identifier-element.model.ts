import { Location } from './location.model';
import { TypeIdentifierChildren } from './type-identifier-children.model';

export class TypeIdentifierElement {
    name ?= '';
    children?: TypeIdentifierChildren = new TypeIdentifierChildren();
    location?: Location = new Location();
}
