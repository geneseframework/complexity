import { Location } from './location.model';
import { UnannClassTypeChildren } from './unann-class-type-children.model';

export class UnannClassType {
    name ?= '';
    children?: UnannClassTypeChildren = new UnannClassTypeChildren();
    location?: Location = new Location();
}
