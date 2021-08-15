import { Location } from './location.model';
import { SwitchBlockChildren } from './switch-block-children.model';

export class SwitchBlock {
    name ?= '';
    children?: SwitchBlockChildren = new SwitchBlockChildren();
    location?: Location = new Location();
}
