import { Location } from './location.model';
import { ReferenceTypeChildren } from './reference-type-children.model';

export class ReferenceType {
    name ?= '';
    children?: ReferenceTypeChildren = new ReferenceTypeChildren();
    location?: Location = new Location()
}
