import { Location } from './location.model';
import { FqnOrRefTypeChildren } from './fqn-or-ref-type-children.model';

export class FqnOrRefType {
    name ?= '';
    children?: FqnOrRefTypeChildren = new FqnOrRefTypeChildren();
    location?: Location = new Location();
}
