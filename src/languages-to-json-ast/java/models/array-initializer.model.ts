import { Location } from './location.model';
import { ArrayInitializerChildren } from './array-initializer-children.model';

export class ArrayInitializer {
    name ?= '';
    children?: ArrayInitializerChildren = new ArrayInitializerChildren();
    location?: Location = new Location();
}
