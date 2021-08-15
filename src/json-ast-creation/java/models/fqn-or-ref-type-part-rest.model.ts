import { Location } from './location.model';
import { FqnOrRefTypePartRestChildren } from './fqn-or-ref-type-part-rest-children.model';

export class FqnOrRefTypePartRest {
    name ?= '';
    children?: FqnOrRefTypePartRestChildren = new FqnOrRefTypePartRestChildren();
    location?: Location = new Location();
}
