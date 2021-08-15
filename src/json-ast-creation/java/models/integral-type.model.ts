import { Location } from './location.model';
import { IntegralTypeChildren } from './integral-type-children.model';

export class IntegralType {
    name ?= '';
    children?: IntegralTypeChildren = new IntegralTypeChildren();
    location?: Location = new Location();
}
