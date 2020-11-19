import { Location } from './location.model';
import { UnannPrimitiveTypeChildren } from './unann-primitive-type-children.model';

export class UnannPrimitiveType {
    name ?= '';
    children?: UnannPrimitiveTypeChildren = new UnannPrimitiveTypeChildren();
    location?: Location = new Location();
}
