import { Location } from './location.model';
import { FqnOrRefTypePartFirstChildren } from './fqn-or-ref-type-part-first-children.model';

export class FqnOrRefTypePartFirst {
    name ?= '';
    children?: FqnOrRefTypePartFirstChildren = new FqnOrRefTypePartFirstChildren();
    location?: Location = new Location();
}
