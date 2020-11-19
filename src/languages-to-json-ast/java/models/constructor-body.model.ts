import { ConstructorBodyChildren } from './constructor-body-children.model';
import { Location } from './location.model';

export class ConstructorBody {
    name ?= '';
    children?: ConstructorBodyChildren = new ConstructorBodyChildren();
    location?: Location = new Location();
}
