import { Location } from './location.model';
import { SwitchLabelChildren } from './switch-label-children.model';

export class SwitchLabel {
    name ?= '';
    children?: SwitchLabelChildren = new SwitchLabelChildren();
    location?: Location = new Location();
}
