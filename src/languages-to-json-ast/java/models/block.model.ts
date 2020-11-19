import { BlockChildren } from './block-children.model';
import { Location } from './location.model';

export class Block {
    name ?= '';
    children?: BlockChildren = new BlockChildren();
    location?: Location = new Location();
}
