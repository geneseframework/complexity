import { Location } from './location.model';
import { ArrayAccessSuffixChildren } from './array-access-suffix-children.model';

export class ArrayAccessSuffix {
    name ?= '';
    children?: ArrayAccessSuffixChildren = new ArrayAccessSuffixChildren();
    location?: Location = new Location();
}
