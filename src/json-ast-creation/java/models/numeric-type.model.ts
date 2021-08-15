import { Location } from './location.model';
import { NumericTypeChildren } from './numeric-type-children.model';

export class NumericType {
    name ?= '';
    children?: NumericTypeChildren = new NumericTypeChildren();
    location?: Location = new Location();
}
