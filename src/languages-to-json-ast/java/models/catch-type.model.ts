import { CatchTypeChildren } from './catch-type-children.model';

export class CatchType {
    name ?= '';
    children?: CatchTypeChildren = new CatchTypeChildren();
    location?: Location = new Location();
}
