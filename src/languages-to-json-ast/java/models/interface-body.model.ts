import { Location } from './location.model';
import { InterfaceBodyChildren } from './interface-body-children.model';

export class InterfaceBody {
    name ?= '';
    children?: InterfaceBodyChildren = new InterfaceBodyChildren();
    location?: Location = new Location();
}
