import { Location } from './location.model';
import { DiamondChildren } from './diamond-children.model';

export class Diamond {
    name ?= '';
    children?: DiamondChildren = new DiamondChildren();
    location?: Location = new Location();
}
