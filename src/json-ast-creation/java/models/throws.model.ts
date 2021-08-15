import { ThrowsChildren } from './throws-children.model';
import { Location } from './location.model';

export class Throws {
    name ?= '';
    children?: ThrowsChildren = new ThrowsChildren();
    location?: Location = new Location();
}
