import { Location } from './location.model';
import { FloatingPointTypeChildren } from './floating-point-type-children.model';

export class FloatingPointType {
    name ?= '';
    children?: FloatingPointTypeChildren = new FloatingPointTypeChildren();
    location?: Location = new Location();
}
