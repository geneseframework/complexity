import { Location } from './location.model';
import { UnannTypeChildren } from './unann-type-children.model';

export class UnannType {
    name ?= '';
    children?: UnannTypeChildren = new UnannTypeChildren();
    location?: Location = new Location();
}
