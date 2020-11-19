import { Location } from './location.model';
import { ForInitChildren } from './for-init-children.model';

export class ForInit {
    name ?= '';
    children?: ForInitChildren = new ForInitChildren();
    location?: Location = new Location();
}
