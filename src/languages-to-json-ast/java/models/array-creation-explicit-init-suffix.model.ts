import { Location } from './location.model';
import { ArrayCreationExplicitInitSuffixChildren } from './array-creation-explicit-init-suffix-children.model';

export class ArrayCreationExplicitInitSuffix {
    name ?= '';
    children?: ArrayCreationExplicitInitSuffixChildren = new ArrayCreationExplicitInitSuffixChildren();
    location?: Location = new Location();
}
