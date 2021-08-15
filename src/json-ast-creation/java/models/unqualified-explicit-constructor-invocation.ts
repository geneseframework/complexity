import { Location } from './location.model';
import { UnqualifiedExplicitConstructorInvocationChildren } from './unqualified-explicit-constructor-invocation-children';

export class UnqualifiedExplicitConstructorInvocation {
    name ?= '';
    children?: UnqualifiedExplicitConstructorInvocationChildren = new UnqualifiedExplicitConstructorInvocationChildren();
    location?: Location = new Location();
}
