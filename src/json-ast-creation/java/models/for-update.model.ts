import { Location } from './location.model';
import { ForUpdateChildren } from './for-update-children.model';

export class ForUpdate {
    name ?= '';
    children?: ForUpdateChildren = new ForUpdateChildren();
    location?: Location = new Location();
}
