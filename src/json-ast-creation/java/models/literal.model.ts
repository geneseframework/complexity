import { Location } from './location.model';
import { LiteralChildren } from './literal.children.model';

export class Literal {
    name ?= '';
    children?: LiteralChildren = new LiteralChildren();
    location?: Location = new Location();
}
