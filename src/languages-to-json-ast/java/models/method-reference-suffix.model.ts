import { Location } from './location.model';
import { MethodReferenceSuffixChildren } from './method-reference-suffix-children.model';

export class MethodReferenceSuffix {
    name ?= '';
    children?: MethodReferenceSuffixChildren = new MethodReferenceSuffixChildren();
    location?: Location = new Location();
}
