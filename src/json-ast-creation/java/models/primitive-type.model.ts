import { Location } from './location.model';
import { PrimitiveTypeChildren } from './primitive-type-children.model';

export class PrimitiveType {
    name ?= '';
    children?: PrimitiveTypeChildren = new PrimitiveTypeChildren();
    location?: Location = new Location();
}
