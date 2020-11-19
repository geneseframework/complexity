import { Location } from './location.model';
import { MethodInvocationSuffixChildren } from './method-invocation-suffix-children.model';

export class MethodInvocationSuffix {
    name ?= '';
    children?: MethodInvocationSuffixChildren = new MethodInvocationSuffixChildren();
    location?: Location = new Location();
}
