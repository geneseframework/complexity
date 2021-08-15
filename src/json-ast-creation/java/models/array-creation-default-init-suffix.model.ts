import { Location } from './location.model';
import { ArrayCreationDefaultInitSuffixChildren } from './array-creation-default-init-suffix-children.model';

export class ArrayCreationDefaultInitSuffix {
    name ?= '';
    children?: ArrayCreationDefaultInitSuffixChildren = new ArrayCreationDefaultInitSuffixChildren();
    location?: Location = new Location();
}
