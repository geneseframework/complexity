import { Location } from './location.model';
import { PrimaryChildren } from './primary-children.model';

export class Primary {
    name ?= '';
    children?: PrimaryChildren = new PrimaryChildren();
    location?: Location = new Location()
}
