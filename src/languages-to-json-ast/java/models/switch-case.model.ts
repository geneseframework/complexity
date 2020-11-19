import { Location } from './location.model';
import { SwitchCaseChildren } from './switch-case-children.model';

export class SwitchCase {
    name ?= '';
    children?: SwitchCaseChildren = new SwitchCaseChildren();
    location?: Location = new Location();
}
