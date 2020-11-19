import { Location } from './location.model';
import { UnannReferenceTypeChildren } from './unann-reference-type-children.model';

export class UnannReferenceType {
    name ?= '';
    children?: UnannReferenceTypeChildren = new UnannReferenceTypeChildren();
    location?: Location = new Location();
}
