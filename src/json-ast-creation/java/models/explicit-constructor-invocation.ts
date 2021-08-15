import { Location } from './location.model';
import { ExplicitConstructorInvocationChildren } from './explicit-constructor-invocation-children';

export class ExplicitConstructorInvocation {
    name ?= '';
    children?: ExplicitConstructorInvocationChildren = new ExplicitConstructorInvocationChildren();
    location?: Location = new Location();
}
