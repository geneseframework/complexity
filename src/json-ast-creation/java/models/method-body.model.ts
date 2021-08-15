import { Location } from './location.model';
import { MethodBodyChildren } from './method-body-children.model';

export class MethodBody {
    name ?= '';
    children?: MethodBodyChildren = new MethodBodyChildren();
    location?: Location = new Location();
}
