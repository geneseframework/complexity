import { FinallyChildren } from './finally-children.model';
import { Location } from './location.model';

export class Finally {
    name ?= '';
    children?: FinallyChildren = new FinallyChildren();
    location?: Location = new Location();
}
