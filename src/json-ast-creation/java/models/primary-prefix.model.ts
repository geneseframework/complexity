import { Location } from './location.model';
import { PrimaryPrefixChildren } from './primary-prefix-children.model';

export class PrimaryPrefix {
    name ?= '';
    children?: PrimaryPrefixChildren = new PrimaryPrefixChildren();
    location?: Location = new Location();
}
