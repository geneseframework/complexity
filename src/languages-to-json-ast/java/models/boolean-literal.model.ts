import { Location } from './location.model';
import { BooleanLiteralChildren } from './boolean-literal-children.model';

export class BooleanLiteral {
    name ?= '';
    children?: BooleanLiteralChildren = new BooleanLiteralChildren();
    location?: Location = new Location();
}
