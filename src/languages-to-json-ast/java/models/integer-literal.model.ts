import { Location } from './location.model';
import { IntegerLiteralChildren } from './integer-literal-children.model';

export class IntegerLiteral {
    name ?= '';
    children?: IntegerLiteralChildren = new IntegerLiteralChildren();
    location?: Location = new Location();
}
