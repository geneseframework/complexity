import { CatchesChildren } from './catches-children';
import { Location } from './location.model';

export class Catches {
    name ?= '';
    children?: CatchesChildren = new CatchesChildren();
    location?: Location = new Location();
}
